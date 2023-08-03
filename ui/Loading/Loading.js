import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Spinner } from '@blueprintjs/core'

const Loading = ({
  hasData,
  isLoading,
  spinnerSize,
  t,
}) => (
  <div className='loading'>
    {isLoading && <Spinner size={spinnerSize} />}
    {!hasData && !isLoading && <div className='loading'>{t('no_data')}</div>}
  </div>
)

Loading.propTypes = {
  hasData: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  spinnerSize: PropTypes.number,
  t: PropTypes.func.isRequired,
}

Loading.defaultProps = {
  spinnerSize: 24,
}

export default withTranslation()(Loading)
