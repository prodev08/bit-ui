import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import _map from 'lodash/map'

import appConfig from 'config'

import LinkedLabel from '../LinkedLabel'

const GlossaryLinks = ({ links, i18nKey, t }) => {
  const { glossaryBaseUrl } = appConfig

  if (links) {
    return (
      <Trans i18nKey={i18nKey}>
        {_map(links, ({ to, label }) => {
          const href = `${glossaryBaseUrl}#${to}`

          return (
            <LinkedLabel
              key={label}
              href={href}
              label={t(label)}
            />
          )
        })}
      </Trans>
    )
  }
  return t(i18nKey)
}

GlossaryLinks.propTypes = {
  i18nKey: PropTypes.string,
  links: PropTypes.array,
  t: PropTypes.func.isRequired,
}

GlossaryLinks.defaultProps = {
  i18nKey: null,
  links: null,
}

export default GlossaryLinks
