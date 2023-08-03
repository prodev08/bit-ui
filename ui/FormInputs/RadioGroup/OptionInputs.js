import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import _map from 'lodash/map'

import InputField from 'ui/FormInputs/InputField'
import GlossaryLinks from '../GlossaryLinks'

const OptionInputs = ({
  inputs,
  optionValue,
  selectedValue,
  t,
}) => (
  _map(inputs, (optionInput, index) => {
    const {
      name,
      label,
      title,
      links,
      hideUnselected,
    } = optionInput

    if (hideUnselected && selectedValue !== optionValue) {
      return null
    }

    return (
      <div key={name}>
        {title && <GlossaryLinks i18nKey={title} t={t} links={links} />}
        <Field
          component={InputField}
          key={index}
          disabled={optionValue !== selectedValue}
          label={label ? t(label) : ''}
          name={name}
        />
      </div>
    )
  })
)

OptionInputs.propTypes = {
  inputs: PropTypes.array,
  optionValue: PropTypes.string,
  selectedValue: PropTypes.string,
  t: PropTypes.func.isRequired,
}

OptionInputs.defaultProps = {
  inputs: [],
  optionValue: null,
  selectedValue: null,
}

export default OptionInputs
