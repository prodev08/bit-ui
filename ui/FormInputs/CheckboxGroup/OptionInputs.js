import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import _map from 'lodash/map'

import InputField from 'ui/FormInputs/InputField'
import GlossaryLinks from '../GlossaryLinks'

const OptionInputs = ({ inputs, t }) => (
  _map(inputs, (optionInput, index) => {
    const {
      name,
      label,
      title,
      links,
    } = optionInput

    return (
      <div key={name}>
        {title && <GlossaryLinks i18nKey={title} t={t} links={links} />}
        <Field
          component={InputField}
          key={index}
          label={label ? t(label) : ''}
          name={name}
        />
      </div>
    )
  })
)

OptionInputs.propTypes = {
  inputs: PropTypes.array,
  t: PropTypes.func.isRequired,
}

OptionInputs.defaultProps = {
  inputs: [],
}

export default OptionInputs
