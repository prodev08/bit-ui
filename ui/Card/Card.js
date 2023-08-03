import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withTranslation } from 'react-i18next'

const Card = ({
  t,
  Icon,
  name,
  title,
  onClick,
  isActive,
  isDisabled,
}) => {
  const onClickHandler = () => {
    if (isDisabled) {
      return
    }

    onClick(name)
  }

  const classes = classNames('card', {
    'card--active': isActive,
    'card--disabled': isDisabled,
  })

  return (
    <div className={classes} onClick={onClickHandler}>
      <Icon className='card-icon' />
      <div className='card-title'>
        {t(title)}
      </div>
    </div>
  )
}

Card.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

Card.defaultProps = {
  isActive: false,
  isDisabled: false,
}

export default withTranslation()(Card)
