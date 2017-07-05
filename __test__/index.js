import test from 'ava'
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import IsOnline from '../src/js/lib'

import browserEnv from 'browser-env'
browserEnv()

test('renders expected HTML element', (t) => {
  const Component = IsOnline(({ ...props }) => {
    return (
      <div>{ props.isOnline }</div>
    )
  })
  const wrapper = shallow(<Component />).dive()

  t.is(wrapper.find('div').length, 1)
})
