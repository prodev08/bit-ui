import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { RadioGroup as BptRadioGroup, Radio } from '@blueprintjs/core'
import _map from 'lodash/map'

import Label from 'ui/FormInputs/Label'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import WarningLabel from 'ui/FormInputs/WarningLabel'

import withMissingInputValueMessage from 'HOC/withMissingInputValueMessage'
import withReduxForm from './withReduxForm'
import OptionInputs from './OptionInputs'
import GlossaryLinks from '../GlossaryLinks'

const RadioGroup = ({
  data, disabled, input, meta, missingValueMessage, t,
}) => {
  const { name, onChange: onInputChange, value } = input
  const { error, submitFailed } = meta
  const {
    label,
    links,
    options,
    inline,
  } = data

  const onChange = (e) => {
    const { value } = e.currentTarget
    onInputChange(value)
  }

  const handleClick = (e) => {
    if (e.currentTarget.checked) {
      onInputChange(null)
    }
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

  const title = getTitle()

  return (
    <div name={name} className='radio-group'>
      {title && <Label value={title} />}
      <BptRadioGroup
        disabled={disabled}
        inline={inline}
        onChange={onChange}
        selectedValue={value}
      >
        {_map(options, (option) => {
          const {
            label,
            inputs,
            links,
            value: optionValue,
          } = option

          return [
            <Radio
              label={(<GlossaryLinks i18nKey={label} links={links} t={t} />)}
              value={optionValue}
              onClick={handleClick}
            />,
            <OptionInputs
              t={t}
              inputs={inputs}
              optionValue={optionValue}
              selectedValue={value}
            />,
          ]
        })}
      </BptRadioGroup>
      {submitFailed && <ErrorLabel error={error} />}
      {!submitFailed && <WarningLabel warning={missingValueMessage} />}
    </div>
  )
}

RadioGroup.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    links: PropTypes.array,
    inline: PropTypes.bool,
  }).isRequired,
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitFailed: PropTypes.bool,
  }).isRequired,
  missingValueMessage: PropTypes.string,
  t: PropTypes.func.isRequired,
}

RadioGroup.defaultProps = {
  disabled: false,
  missingValueMessage: undefined,
}

export default withReduxForm(
  withMissingInputValueMessage(withTranslation()(RadioGroup)),
)
