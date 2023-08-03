import memoize from 'lodash/memoize'

import disabledOption from 'ui/FormInputs/Select/Items/disabledOption'
import ACCOUNT_STATUSES from 'var/accountStatuses'

export const getAccountStatusItems = memoize((isAllOptionDisabled) => [
  { value: '', label: 'compliance.all', disabled: isAllOptionDisabled },
  disabledOption,
  { value: ACCOUNT_STATUSES.INCOMPLETE, label: 'compliance.overview.incomplete' },
  { value: ACCOUNT_STATUSES.SUBMITTED, label: 'compliance.overview.submitted' },
  { value: ACCOUNT_STATUSES.PENDING, label: 'compliance.overview.pending' },
  { value: ACCOUNT_STATUSES.VERIFIED, label: 'compliance.overview.verified' },
  { value: ACCOUNT_STATUSES.CANCELED, label: 'compliance.overview.canceled' },
  { value: ACCOUNT_STATUSES.REFUSED, label: 'compliance.overview.refused' },
  { value: ACCOUNT_STATUSES.EXPIRED, label: 'compliance.overview.expired' },
  { value: ACCOUNT_STATUSES.REQUESTED, label: 'compliance.overview.requested' },
  { value: ACCOUNT_STATUSES.UPDATED, label: 'compliance.overview.updated' },
])

export default getAccountStatusItems
