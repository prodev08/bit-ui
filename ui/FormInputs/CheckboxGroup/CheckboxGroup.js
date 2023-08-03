import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Checkbox, Label } from '@blueprintjs/core'
import _map from 'lodash/map'

import ErrorLabel from 'ui/FormInputs/ErrorLabel'

import withReduxForm from './withReduxForm'
import OptionInputs from './OptionInputs'
import GlossaryLinks from '../GlossaryLinks'

const CheckboxGroup = ({
  data, input, meta, t,
}) => {
  const { name, onChange: onInputChange, value: inputValue } = input
  const { error, submitFailed } = meta
  const {
    label,
    links,
    options,
  } = data

  const onChange = (e) => {
    const { value } = e.currentTarget

    const nextValue = inputValue.includes(value)
      ? inputValue.filter((val) => val !== value)
      : [...inputValue, value].sort()

    onInputChange(nextValue)
  }

  const getTitle = () => {
    if (links) {
      return <GlossaryLinks i18nKey={label} links={links} t={t} />
    }
    if (label) {
      return t(label)
    }
    return ''
  }

  return (
    <div name={name}>
      <div>
        <Label>{getTitle()}</Label>
        {_map(options, (option) => {
          const {
            label,
            inputs,
            links,
            value: optionValue,
          } = option

          return (
            <div key={optionValue}>
              <Checkbox
                className='checkbox-group-checkbox'
                checked={inputValue.includes(optionValue)}
                label={(<GlossaryLinks i18nKey={label} links={links} t={t} />)}
                onClick={onChange}
                value={optionValue}
              />,
              <OptionInputs
                inputs={inputs}
                t={t}
              />
            </div>
          )
        })}
      </div>
      {submitFailed && <ErrorLabel error={error} />}
    </div>
  )
}

CheckboxGroup.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    links: PropTypes.array,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitFailed: PropTypes.bool,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default withReduxForm(withTranslation()(CheckboxGroup))
