import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import getDocumentName from 'utils/documents/getDocumentName'
import getDocumentLocalName from 'utils/documents/getDocumentLocalName'
import Tooltip from 'ui/Tooltip'
import Icons from 'icons'

const DocumentLabel = ({
  docType,
  country,
  isFastTrackDoc,
  showFastTrackIcon,
  showName,
  showDisplayNameInContent,
  showDisplayNameInTooltip,
  className,
}) => {
  const { t } = useTranslation()

  const docName = t(getDocumentName(docType))
  const displayName = isFastTrackDoc
    ? getDocumentLocalName({ country, docType, t })
    : ''

  const classes = classNames('document-label', className)

  const tooltipContent = isFastTrackDoc ? (
    <div>
      <div>{t('fast_track_document')}</div>
      {showDisplayNameInTooltip && displayName && <div>{displayName}</div>}
    </div>
  ) : ''

  return (
    <Tooltip content={tooltipContent}>
      <div className={classes}>
        {showName && <div>{docName}</div>}
        {showFastTrackIcon && isFastTrackDoc && <Icons.LIGHTNING />}
        {showDisplayNameInContent && displayName && <div>{displayName}</div>}
      </div>
    </Tooltip>
  )
}

DocumentLabel.propTypes = {
  docType: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  isFastTrackDoc: PropTypes.bool,
  showFastTrackIcon: PropTypes.bool,
  showName: PropTypes.bool,
  showDisplayNameInContent: PropTypes.bool,
  showDisplayNameInTooltip: PropTypes.bool,
  className: PropTypes.string,
}

DocumentLabel.defaultProps = {
  isFastTrackDoc: false,
  showFastTrackIcon: false,
  showName: true,
  showDisplayNameInContent: false,
  showDisplayNameInTooltip: true,
  className: undefined,
}

export default DocumentLabel
