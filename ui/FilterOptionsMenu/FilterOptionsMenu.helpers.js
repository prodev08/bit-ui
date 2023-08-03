import FILTER_TYPES from './var/filterTypes'

export const parseFilter = (value, filterType) => {
  if (!value) {
    return value
  }

  switch (filterType) {
    case FILTER_TYPES.CONTAINS:
    default:
      return `%${value}%`
    case FILTER_TYPES.EXACT:
      return value
    case FILTER_TYPES.START:
      return `${value}%`
    case FILTER_TYPES.END:
      return `%${value}`
  }
}
