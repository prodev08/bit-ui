import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import disabledOption from 'ui/FormInputs/Select/Items/disabledOption'
import { formatAdminUsername } from 'components/Compliance/utils'

const AdminUsernameSelector = ({
  addSystemUsernames,
  admins,
  adminUsername,
  allValue,
  fullUsernameValue,
  onChange,
  value,
  t,
  ...extraProps
}) => {
  const formatUsernameValue = (username) => (
    fullUsernameValue
      ? username
      : formatAdminUsername(username)
  )

  const myselfOption = {
    label: 'myself',
    value: formatUsernameValue(adminUsername),
  }

  const blankOption = {
    id: 'blank_option',
    label: 'compliance.all',
    value: allValue,
  }

  const systemUsernames = addSystemUsernames ? [
    { value: 'user', label: 'user' },
    { value: 'backend', label: 'backend' },
  ] : []

  const assigneeItems = [
    myselfOption,
    disabledOption,
    blankOption,
    ...systemUsernames,
    ...admins
      .filter((admin) => admin !== adminUsername)
      .sort()
      .map((username) => ({
        isTranslationDisabled: true,
        label: formatAdminUsername(username),
        value: formatUsernameValue(username),
      })),
  ]

  return (
    <Select
      className='task-filters-assignee'
      items={assigneeItems}
      label={t('assignee')}
      name='assignee'
      onChange={onChange}
      value={value}
      {...extraProps}
    />
  )
}

AdminUsernameSelector.propTypes = {
  addSystemUsernames: PropTypes.bool,
  admins: PropTypes.arrayOf(PropTypes.string).isRequired,
  adminUsername: PropTypes.string.isRequired,
  allValue: PropTypes.string,
  fullUsernameValue: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.string,
}

AdminUsernameSelector.defaultProps = {
  addSystemUsernames: false,
  allValue: 'all',
  fullUsernameValue: false,
  value: '',
}

export default AdminUsernameSelector
