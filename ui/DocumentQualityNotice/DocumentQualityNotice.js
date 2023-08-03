import React from 'react'
import PropTypes from 'prop-types'

import { Intent } from '@blueprintjs/core'
import SmallNotice from 'ui/SmallNotice'

const DocumentQualityNotice = ({ document, t }) => {
  const { issue, quality } = document

  if (quality || !issue) {
    return null
  }

  return (
    <SmallNotice intent={Intent.WARNING}>
      <div>{t(`document_quality.${issue}`)}</div>
      <div>{t('document_quality.continue')}</div>
    </SmallNotice>
  )
}

DocumentQualityNotice.propTypes = {
  document: PropTypes.shape({
    issue: PropTypes.string,
    quality: PropTypes.bool,
  }),
  t: PropTypes.func.isRequired,
}

DocumentQualityNotice.defaultProps = {
  document: {},
}

export default DocumentQualityNotice
