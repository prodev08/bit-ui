import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Select from 'ui/FormInputs/Select'
import { languageSelectItems } from 'ui/FormInputs/Select/Items/language'
import { changeLocale } from 'utils/dates'
import { saveLanguageToLocalStorage } from 'utils/languages'
import LANGUAGES from 'var/languages'

const LangSelector = ({ minimal }) => {
  const { i18n } = useTranslation()
  const { language } = i18n

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
    changeLocale(language)
    saveLanguageToLocalStorage(language)
  }

  useEffect(() => {
    if (!language) {
      // eslint-disable-next-line no-console
      console.error(
        `Unknown language attribute (${language}), setting English (${LANGUAGES.EN})`,
      )
      handleLanguageChange(LANGUAGES.EN)
    }
  })

  return (
    <Select
      value={language}
      selectedItemExcluded
      isTranslationDisabled
      onChange={handleLanguageChange}
      items={languageSelectItems}
      minimal={minimal}
    />
  )
}

LangSelector.propTypes = {
  minimal: PropTypes.bool,
}

LangSelector.defaultProps = {
  minimal: false,
}

export default memo(LangSelector)
