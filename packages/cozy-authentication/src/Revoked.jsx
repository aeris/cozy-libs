/* global cozy */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'cozy-ui/transpiled/react/Modal'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { register, getURL } from './client-compat'

class Revoked extends Component {
  logout() {
    this.props.onLogout()
  }

  async logBackIn() {
    const url =
      this.props.url || cozy.client._url || getURL(this.context.client)
    if (cozy.client && cozy.client._storage) {
      cozy.client._storage.clear()
    }
    try {
      const cozyClient = this.context.client
      const registration = await register(cozyClient, url)
      this.props.onLogBackIn({
        url,
        clientInfo: registration.client,
        token: registration.token,
        router: this.props.router
      })
    } catch (e) {
      console.warn(e) // eslint-disable-line no-console
    }
  }

  render() {
    const { t } = this.props
    return (
      <Modal
        title={t('mobile.revoked.title')}
        description={t('mobile.revoked.description')}
        secondaryText={t('mobile.revoked.logout')}
        secondaryAction={() => {
          this.logout()
        }}
        primaryText={t('mobile.revoked.loginagain')}
        primaryAction={() => {
          this.logBackIn()
        }}
        closable={false}
      />
    )
  }
}

Revoked.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onLogBackIn: PropTypes.func.isRequired,
  router: PropTypes.object,
  url: PropTypes.string
}

Revoked.contextTypes = {
  client: PropTypes.object
}

export default translate()(Revoked)
