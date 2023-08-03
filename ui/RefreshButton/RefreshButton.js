import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import Tooltip from 'ui/Tooltip'

const RefreshButton = ({ onClick, t }) => (
  <Tooltip content={t('refresh')}>
    <Button
      icon={IconNames.REFRESH}
      onClick={onClick}
      className='refresh-button'
    />
  </Tooltip>
)

RefreshButton.propTypes = {
  onClick: PropTypes.func,
  t: PropTypes.func.isRequired,
}

RefreshButton.defaultProps = {
  onClick: () => {},
}

export default withTranslation()(RefreshButton)
