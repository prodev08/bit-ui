import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Button, Intent } from '@blueprintjs/core'

const WebcamPicture = ({
  alt, className, onRetake, src,
}) => {
  const { t } = useTranslation()

  const classes = classNames('webcam-picture', className)

  return (
    <div className='webcam-picture-wrapper'>
      <img alt={alt} className={classes} src={src} />
      <Button
        className='bp3-button--large webcam-picture-retake'
        intent={Intent.PRIMARY}
        onClick={onRetake}
      >
        {t('retake')}
      </Button>
    </div>
  )
}

WebcamPicture.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onRetake: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
}

WebcamPicture.defaultProps = {
  className: '',
}

export default memo(WebcamPicture)
