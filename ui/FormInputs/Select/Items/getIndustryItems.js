import _memoize from 'lodash/memoize'

import i18n from 'i18n'

const _getIndustries = _memoize(() => i18n.t('fin.industries', { returnObjects: true }))

export const getIndustries = () => _getIndustries(i18n.t('verification'))

const getIndustryItems = () => getIndustries().map((industry, i) => ({
  value: i.toString(),
  label: industry,
}))

export default getIndustryItems
