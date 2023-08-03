import { THEME_TYPES } from 'var/themes'

export const getTheme = (theme) => {
  switch (theme) {
    case THEME_TYPES.MIDNIGHT:
    case THEME_TYPES.DARK:
    case THEME_TYPES.BLACK:
      return 'google'
    case THEME_TYPES.LIGHT:
    case THEME_TYPES.COLOURBLIND:
    default:
      return 'bright:inverted'
  }
}

export default {
  getTheme,
}
