import _isFunction from 'lodash/isFunction'

const getOnChangeHandler = ({ input = {}, onChange, onChangeFilter }) => (e) => {
  const shouldUpdate = onChangeFilter(e)
  if (shouldUpdate === false) {
    return false
  }

  // call custom event handler
  onChange(e)

  // call redux-form event handler
  if (_isFunction(input.onChange)) {
    input.onChange(e)
  }
}

export default getOnChangeHandler
