/* eslint-env jest */
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {
  AccountForm,
  AccountFields,
  AccountField
} from 'components/AccountForm'

configure({ adapter: new Adapter() })

const fixtures = {
  fields: {
    username: {
      type: 'text'
    },
    passphrase: {
      type: 'password'
    }
  },
  sanitized: {
    username: {
      encrypted: false,
      required: true,
      type: 'text'
    },
    passphrase: {
      encrypted: true,
      required: true,
      type: 'password'
    }
  },
  account: {
    auth: {
      username: 'Toto',
      credentials_encrypted:
        'bmFjbGj8JQfzzfTQ2aGKTpI+HI9N8xKAQqPTPD6/84x5GyiHm2hdn7N6rO8cLTCnkdsnd2eFWJRf'
    }
  }
}

const t = jest.fn().mockImplementation(key => key)

describe('AccountForm', () => {
  it('should render', () => {
    const wrapper = shallow(<AccountForm fields={fixtures.fields} t={t} />)
    const component = wrapper.dive().getElement()
    expect(component).toMatchSnapshot()
  })

  it('should inject initial values from account', () => {
    const wrapper = shallow(
      <AccountForm account={fixtures.account} fields={fixtures.fields} t={t} />
    )
    expect(wrapper.props().initialValues).toEqual(fixtures.account.auth)
  })

  describe('AccountFields', () => {
    it('should render', () => {
      const component = shallow(
        <AccountFields manifestFields={fixtures.fields} t={t} />
      ).getElement()
      expect(component).toMatchSnapshot()
    })
  })

  describe('AccountField', () => {
    it('should render', () => {
      const wrapper = shallow(
        <AccountField {...fixtures.sanitized.username} name="username" t={t} />
      )
      const component = wrapper.dive().getElement()
      expect(component).toMatchSnapshot()
    })

    it('render password', () => {
      const wrapper = shallow(
        <AccountField
          {...fixtures.sanitized.passphrase}
          name="passphrase"
          t={t}
        />
      )
      const component = wrapper.dive().getElement()
      expect(component).toMatchSnapshot()
    })

    it('uses predefined label', () => {
      const wrapper = shallow(
        <AccountField
          label="login"
          name="username"
          required={true}
          type="text"
          t={t}
        />
      )
      expect(wrapper.props().label).toBe('fields.login.label')
    })

    it('ignores invalid predefined label', () => {
      const wrapper = shallow(
        <AccountField
          label="foo"
          name="username"
          required={true}
          type="text"
          t={t}
        />
      )
      expect(wrapper.props().label).toBe('fields.username.label')
    })
  })
})
