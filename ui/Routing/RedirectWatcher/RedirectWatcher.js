import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'

import MODAL_TYPES from 'var/modalTypes'
import usePush from 'hooks/routing/usePush'
import useShowModal from 'hooks/useShowModal'

const RedirectWatcher = ({ shouldShowPrompt }) => {
  const push = usePush()
  const showModal = useShowModal()

  const onRedirect = (location) => {
    const { state = {} } = location

    if (state.skipRedirectChecks) {
      // redirect
      return true
    }

    const isPromptShown = shouldShowPrompt()
    if (isPromptShown) {
      showModal({
        type: MODAL_TYPES.CONFIRMATION,
        message: 'modals.redirect_unsaved',
        onSuccess: () => push(location, { skipRedirectChecks: true }),
      })

      // skip both prompt and redirect
      return false
    }

    // redirect
    return true
  }

  return <Prompt when message={onRedirect} />
}

RedirectWatcher.propTypes = {
  shouldShowPrompt: PropTypes.func.isRequired,
}

export default memo(RedirectWatcher)
