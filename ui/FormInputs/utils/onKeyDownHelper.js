import { submit } from 'redux-form'
import _isFunction from 'lodash/isFunction'

const onKeyDownHelper = ({
  onEnterKey, onBlur, submitOnEnterKey, meta = {},
}, e) => {
  const { form, dispatch } = meta
  const { keyCode, target } = e

  if (keyCode === 13) {
    // has to be connected to redux-form
    if (submitOnEnterKey) {
      setTimeout(() => {
        dispatch(submit(form))
      }, 150)
    }

    if (_isFunction(onEnterKey)) {
      e.persist()
      setTimeout(() => {
        onEnterKey(e)
      }, 150)
    }

    if (!onBlur && (submitOnEnterKey || onEnterKey)) { // skip one onBlur
      target.blur()
    }
  }
}

export default onKeyDownHelper
