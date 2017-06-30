# react-is-online

[![npm version](https://img.shields.io/npm/v/react-is-online.svg?style=flat-square)](https://www.npmjs.com/package/react-is-online)
[![travis](http://img.shields.io/travis/makotot/react-is-online.svg?style=flat-square)](https://travis-ci.org/makotot/react-is-online)
[![License](http://img.shields.io/npm/l/react-is-online.svg?style=flat-square)](https://github.com/makotot/react-is-online)

> Higher order component to detect the network goes to offline or not.

[Demo](http://makotot.github.io/react-is-online/)

## Install

```sh
$ npm i react-is-online
```

## Usage

```js
import IsOnline from 'react-is-online'

const IsOnlineComponent = IsOnline(({ ...props }) => {
  return (
    <a
      href="#"
      onClick={ props.reconnect }
      className={ props.isOnline ? '...' : '...' }
    >
    </a>
  )
})

<IsOnlineComponent />
```

## Props

| props | type | description |
| ----- | ----- | ------- |
| `isOnline` | Boolean | Boolean value the network is online or not. |
| `reconnect` | Function | Method trying to connect to the network. |
| `isMonitoring` | Boolean | |
| `isReconnecting` | Boolean | |

## License

MIT
