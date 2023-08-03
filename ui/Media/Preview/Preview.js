import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import HeicPreview from 'ui/Media/HeicPreview'
import Image from 'ui/Media/Image'
import PDF from 'ui/Media/PDF'
import Video from 'ui/Media/Video'
import getLink from 'utils/documents/getLink'
import getDocumentType from 'utils/documents/getType'
import DOCUMENT_TYPES from 'var/files/documentTypes'
import documentPropType from 'var/propTypes/document'

const Preview = ({
  className,
  document = {},
  isContextMenuDisabled,
  rotation,
}) => {
  const { t } = useTranslation()

  const getPreview = () => {
    const { filename } = document

    const src = getLink(document)
    const documentType = getDocumentType(filename)

    switch (documentType) {
      case DOCUMENT_TYPES.IMAGE:
        return (
          <Image
            isContextMenuDisabled={isContextMenuDisabled}
            rotation={rotation}
            src={src}
          />
        )
      case DOCUMENT_TYPES.HEIC:
        return (
          <HeicPreview
            isContextMenuDisabled={isContextMenuDisabled}
            rotation={rotation}
            src={src}
          />
        )
      case DOCUMENT_TYPES.PDF:
        return <PDF src={src} />
      case DOCUMENT_TYPES.ZIP:
        return t('preview_unavailable', { type: DOCUMENT_TYPES.ZIP.toUpperCase() })
      case DOCUMENT_TYPES.VIDEO:
        return <Video src={src} />
      default:
        return null
    }
  }

  const classes = classNames('preview', className)
  const preview = getPreview()

  return (
    <div className={classes}>
      {preview}
    </div>
  )
}

Preview.propTypes = {
  className: PropTypes.string,
  document: documentPropType.isRequired,
  isContextMenuDisabled: PropTypes.bool,
  rotation: PropTypes.number,
}

Preview.defaultProps = {
  className: '',
  isContextMenuDisabled: false,
  rotation: 0,
}

export default memo(Preview)
