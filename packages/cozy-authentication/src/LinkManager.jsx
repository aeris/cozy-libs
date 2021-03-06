import { hasSafariPlugin, hasInAppBrowserPlugin } from 'cozy-device-helper'

export const nativeLinkOpen = async ({ url }) => {
  if ((await hasSafariPlugin()) && window.SafariViewController) {
    window.SafariViewController.show(
      {
        url: url,
        transition: 'curl'
      },
      result => {
        if (result.event === 'closed') {
          window.SafariViewController.hide()
        }
      },
      error => {
        console.warn(error) // eslint-disable-line no-console
        window.SafariViewController.hide()
      }
    )
  } else if (hasInAppBrowserPlugin()) {
    const target = '_blank'
    const options = 'clearcache=yes,zoom=no'
    window.cordova.InAppBrowser.open(url, target, options)
  } else {
    window.location = url
  }
}
