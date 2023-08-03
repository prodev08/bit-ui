import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import _map from 'lodash/map'

const TransWithLinks = ({
  className,
  i18nKey,
  links,
  values,
}) => (
  <div className={className}>
    <Trans
      i18nKey={i18nKey}
      values={values}
    >
      {_map(links, (href) => (
        <a
          key={href}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
        >
          .
        </a>
      ))}
    </Trans>
  </div>
)

TransWithLinks.propTypes = {
  className: PropTypes.string,
  i18nKey: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.object,
}

TransWithLinks.defaultProps = {
  className: '',
  values: {},
}

export default TransWithLinks
