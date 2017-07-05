import React from 'react'
import PropTypes from 'prop-types'
import request from './request'

const IsOnline = (Component) => {

  return class extends React.Component {
    static get PropTypes() {
      return {
        retryNumber: PropTypes.number,
        interval: PropTypes.number,
        connect: PropTypes.func,
        url: PropTypes.string,
      }
    }

    static get defaultProps() {
      return {
        retryNumber: -1,
        interval: 6000,
        connect() {},
        url: '/favicon.ico',
      }
    }

    constructor(props) {
      super(props)
      this.retryCount = 0
      this.timer = null
      this.update = this.update.bind(this)
      this.inerval = this.props.interval
      this.state = {
        isOnline: window.navigator.onLine,
        isMonitoring: false,
        isReconnecting: false,
      }
    }

    componentDidMount() {
      const win = window

      win.addEventListener('load', this.update)
      win.addEventListener('online', this.update)
      win.addEventListener('offline', this.update)
      win.addEventListener('visibilitychange', this.update)
    }

    componentWillUnmount() {
      const win = window

      win.removeEventListener('load', this.update)
      win.removeEventListener('online', this.update)
      win.removeEventListener('offline', this.update)
      win.removeEventListener('visibilitychange', this.update)
    }

    update() {
      if ((window.event && window.event.type === 'visibilitychange') && window.document.hidden) {
        return
      }
      const isOnline = window.navigator.onLine

      request(this.props.url)
        .then(() => {
            this.setState({
              isOnline,
            }, () => {
              this.retryCount = 0
              this.destroyMonitor()
            })
        })
        .catch(() => {
          this.setState({
            isOnline: false,
          }, () => {
            if (this.retryCount === this.props.retryNumber) {
              this.destroyMonitor()
              return
            }
            this.retryCount++
            this.monitor()
          })
        })
    }

    monitor() {
      if (!this.state.isMonitoring) {
        this.setState({
          isMonitoring: true,
        })
      }
      this.timer = setTimeout(() => {
        this.update()
        this.monitor()
      }, this.interval)
    }

    destroyMonitor() {
      clearTimeout(this.timer)
      this.timer = null
      this.interval = this.props.interval
      this.setState({
        isMonitoring: false,
      })
    }

    reconnect = (e) => {
      e.preventDefault()
      this.setState({
        isReconnecting: true,
      })
      request(this.props.url)
        .then(() => {
          this.setState({
            isReconnecting: false,
          })
        })
        .catch(() => {
          this.setState({
            isReconnecting: false,
          })
        })
    }

    render() {
      return (
        <Component
          { ...this.props }
          reconnect={ this.reconnect }
          isOnline={ this.state.isOnline }
          interval={ this.interval }
          isMonitoring={ this.state.isMonitoring }
          isReconnecting={ this.state.isReconnecting }
        />
      )
    }
  }
}

export default IsOnline
