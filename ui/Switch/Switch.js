import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'
import _get from 'lodash/get'

const Switch = ({
  className, defaultValue, items, onChange, t, value,
}) => {
  const [current, setCurrent] = useState(
    value || defaultValue || _get(items, ['0', 'value'], ''),
  )

  const onSwitch = (value) => {
    if (current === value) {
      return
    }

    setCurrent(value)
    onChange(value)
  }

  const classes = classNames('switch', className)

  return (
    <ButtonGroup className={classes}>
      {items.map((item) => {
        const { value: itemValue, text } = item

        return (
          <Button
            key={itemValue}
            intent={
              (value || current) === itemValue ? Intent.PRIMARY : undefined
            }
            onClick={() => onSwitch(itemValue)}
          >
            {t(text)}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

Switch.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func,
  t: PropTypes.func.isRequired,
  value: PropTypes.string,
}

Switch.defaultProps = {
  className: '',
  defaultValue: '',
  onChange: () => {},
  value: '',
}

export default withTranslation()(Switch)
