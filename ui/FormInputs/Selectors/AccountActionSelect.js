import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'

import Select from 'ui/FormInputs/Select'
import accountActions from 'var/accountActions'
import getActionTranslation from 'utils/getActionTranslation'

const AccountActionsSelect = (props) => {
  const items = _map(
    accountActions,
    (action) => ({
      value: action,
      label: getActionTranslation(action),
    }),
  )
  return (
    <Select items={items} {...props} />
  )
}

AccountActionsSelect.propTypes = {
  blankOption: PropTypes.bool,
}

AccountActionsSelect.defaultProps = {
  blankOption: false,
}

export default AccountActionsSelect
