import _map from 'lodash/map'
import LANGUAGES, { NATIVE_LANGUAGES_KEYS } from 'var/nativeLanguages'
import disabledOption from 'ui/FormInputs/Select/Items/disabledOption'

const languageItems = [
  { value: '', label: 'compliance.language' },
  disabledOption,
  ..._map(NATIVE_LANGUAGES_KEYS, (key) => ({
    value: key,
    label: LANGUAGES[key],
    trans: false,
  })),
]

export const languageSelectItems = [
  ..._map(NATIVE_LANGUAGES_KEYS, (key) => ({
    value: key,
    label: LANGUAGES[key],
  })),
]

export default languageItems
