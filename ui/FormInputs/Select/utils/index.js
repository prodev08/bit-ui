import _map from 'lodash/map'
import _toLower from 'lodash/toLower'
import _filter from 'lodash/filter'
import _find from 'lodash/find'
import _isEqual from 'lodash/isEqual'

const SEARCH_DELAY_LIMIT = 1000

export const findMatch = ({ items, query, indexFrom }) => {
  const regExp = new RegExp(`^${query}`)

  for (let i = indexFrom; i < items.length; i++) {
    if (regExp.test(_toLower(items[i]))) {
      return i
    }
  }

  for (let i = 0; i < indexFrom; i++) {
    if (regExp.test(_toLower(items[i]))) {
      return i
    }
  }

  return -1
}

export const findMatchOnKeyDown = (e, { indexFrom, items, self }) => {
  const { key } = e
  if (!key || key.length !== 1) {
    return -1
  }
  const currentTimestamp = new Date().getTime()

  if (currentTimestamp - self.delayLimit <= SEARCH_DELAY_LIMIT) {
    self.searchQuery += key.toLowerCase()
  } else {
    self.searchQuery = key.toLowerCase()
  }
  self.delayLimit = currentTimestamp

  return findMatch({
    items,
    query: self.searchQuery,
    indexFrom,
  })
}

export const getItemTranslation = (item, isTranslationDisabled, t) => {
  const { value, label, trans } = item

  if (!label) {
    return value
  }

  if (trans === false) {
    return label
  }

  return isTranslationDisabled ? label : t(label)
}

export const getItemsTranslations = (items, isTranslationDisabled, t) => (
  _map(items, (item) => getItemTranslation(item, isTranslationDisabled, t))
)

export const getItems = (blankOption, items) => (
  blankOption
    ? [{ value: '', id: 'blank_option' }, ...items]
    : items)

export const getFilteredItems = (items, value) => _filter(
  items,
  (i) => i.value !== value,
)

export const getDefaultActiveItem = (items, meta, value) => {
  const { initial } = meta
  const [firstItem] = items
  const defaultValue = initial || value

  return _find(
    items,
    ({ value: itemValue }) => _isEqual(itemValue, defaultValue),
  ) || firstItem
}

export default {
  findMatch,
  findMatchOnKeyDown,
  getItemTranslation,
  getItemsTranslations,
  getItems,
  getFilteredItems,
  getDefaultActiveItem,
}
