import test from 'ava'
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { IsOnLine } from '../src/js/lib'

import browserEnv from 'browser-env'
browserEnv()

test('renders expected HTML element', (t) => {
  const Component = IsOnLine(({ ...props }) => {
    return (
      <div>{ props.isOnLine }</div>
    )
  })
  const wrapper = shallow(<Component />).dive()
  t.is(wrapper.find('div').length, 1)
})
