import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { useTranslation } from 'react-i18next'

import InputField from 'ui/FormInputs/InputField'
import DOCUMENT_TYPES from 'var/forms/documentTypes'

const AdditionalCountryField = ({
  document,
  country,
  className,
}) => {
  const { t } = useTranslation()

  if (document === DOCUMENT_TYPES.NATIONAL) {
    switch (country) {
      case '792': // Turkey
        return (
          <Field
            component={InputField}
            label={t('verification_wizard.tax_id_turkey')}
            name='tax_id'
            className={className}
          />
        )
      default:
    }
  }

  return null
}

AdditionalCountryField.propTypes = {
  document: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default AdditionalCountryField
