import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'cozy-ui/react/I18n'
import TranslatedTriggerManager from './components/TriggerManager'

export { KonnectorJobError } from './helpers/konnectors'

const dictRequire = lang => require(`./locales/${lang}.json`)

export const TriggerManager = (props, context) => (
  <I18n dictRequire={dictRequire} lang={context.lang}>
    <TranslatedTriggerManager {...props} />
  </I18n>
)

TriggerManager.contextTypes = {
  lang: PropTypes.string.isRequired
}

export default {
  TriggerManager
}
