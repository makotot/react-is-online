import React from 'react'
import ReactDOM from 'react-dom'
import FaWifi from 'react-icons/lib/fa/wifi'
import FaGithubAlt from 'react-icons/lib/fa/github-alt'
import IsOnline from './lib/'
import { version } from '../../package.json'
import '../scss/app.scss'

const IsOnlineComponent = IsOnline(({ ...props }) => {
  return (
    <a
      href="#"
      onClick={ props.reconnect }
      className={ props.isOnline ? 'c-network' : 'c-network c-network--off' }
    >
      <FaWifi />
    </a>
  )
})

const Reconnect = IsOnline(({ ...props }) => {
  return (
    <div className={ props.isOnline ? 'c-reconnect' : 'c-reconnect c-reconnect--off' }>
      <span>Internet connection seems to be offline.</span>
      <a href="#" className="c-reconnect__link" onClick={ props.reconnect }>Try to recconect</a>
    </div>
  )
})

class App extends React.Component {
  render() {
    return (
      <div className="o-wrapper">
        <main className="c-main">
          <header className="c-main__item">
            <h1 className="c-headline">REACT ISONLINE</h1>
          </header>
          <div className="c-main__item">
            <span className="c-version">version { version }</span>
          </div>
          <div className="c-main__item">
            <IsOnlineComponent />
          </div>
          <div className="c-main__item">
            <span className="c-description">Higher order component to detect the network goes to offline or not.</span>
          </div>
          <div className="c-main__item">
            <span className="c-install">$ npm install react-is-online</span>
          </div>
          <div className="c-main__item">
            <a href="https://github.com/makotot/react-is-online" className="c-github-link">
              <span className="c-github-link__inner">See on Github</span><FaGithubAlt />
            </a>
          </div>
        </main>

        <Reconnect />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('js-app'))
