import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Icons from 'icons'

const CountryEditLabel = ({ isAutoDetectedCountry }) => {
  const { t } = useTranslation()

  return (
    <div className='country-edit-label'>
      {isAutoDetectedCountry && (
        <>
          <Icons.PIN />
          <div className='country-edit-label-text'>
            {t('auto_detected')}
          </div>
        </>
      )}
      <div className='country-edit-label-edit'>
        {t('edit')}
      </div>
    </div>
  )
}

CountryEditLabel.propTypes = {
  isAutoDetectedCountry: PropTypes.bool,
}

CountryEditLabel.defaultProps = {
  isAutoDetectedCountry: false,
}

export default CountryEditLabel
