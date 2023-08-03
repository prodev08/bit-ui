import React from 'react'
import classNames from 'classnames'

import Tooltip from 'ui/Tooltip'
import ACCOUNT_TYPES from 'var/accountTypes'

import { propTypes, defaultProps } from './AccountTypeIcon.props'

const getIconClass = ({ accountType, isMainAccount }) => {
  switch (accountType) {
    case ACCOUNT_TYPES.INDIVIDUAL:
      return 'fa-user'
    case ACCOUNT_TYPES.CORPORATE:
      return 'fa-building'
    default:
      return isMainAccount ? '' : 'fa-id-badge'
  }
}

const AccountTypeIcon = ({
  accountType, className, isMainAccount, t,
}) => {
  const classes = classNames(
    'account-type-icon fa',
    getIconClass({ accountType, isMainAccount }),
    className,
  )

  return (
    <Tooltip content={t(accountType || '')}>
      <i className={classes} />
    </Tooltip>
  )
}

AccountTypeIcon.propTypes = propTypes
AccountTypeIcon.defaultProps = defaultProps

export default AccountTypeIcon
