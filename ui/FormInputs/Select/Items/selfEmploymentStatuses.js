import _map from 'lodash/map'

import SELF_EMPLOYMENT_STATUSES, { SELF_EMPLOYMENT_STATUSES_I18N } from 'var/forms/selfEmploymentStatuses'

const selfEmploymentStatusItems = _map(
  [
    SELF_EMPLOYMENT_STATUSES.BUSINESS_OWNER,
    SELF_EMPLOYMENT_STATUSES.FREELANCE,
    SELF_EMPLOYMENT_STATUSES.PROF_WORKER,
    SELF_EMPLOYMENT_STATUSES.CONTRACTOR,
    SELF_EMPLOYMENT_STATUSES.TEMPORARY_WORK,
    SELF_EMPLOYMENT_STATUSES.OTHER,
  ],
  (type) => ({ label: SELF_EMPLOYMENT_STATUSES_I18N[type], value: type }),
)

export default selfEmploymentStatusItems
