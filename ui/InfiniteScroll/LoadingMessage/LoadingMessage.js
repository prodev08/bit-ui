import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Spinner } from '@blueprintjs/core'

class LoadingMessage extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool,
    className: PropTypes.string,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
    isEmpty: false,
    className: '',
  }

  getMessage = () => {
    const {
      t, isLoading, hasMore, isEmpty,
    } = this.props

    if (isLoading) {
      return <Spinner size={30} className='infinite-scroll-message-spinner' />
    }

    if (isEmpty) {
      return t('no_data')
    }

    if (!hasMore) {
      return t('no_more_data')
    }

    return ''
  }

  render() {
    const { className } = this.props

    const message = this.getMessage()

    const classes = classNames('infinite-scroll-message', className)

    return (
      <div className={classes}>
        {message}
      </div>
    )
  }
}

export default LoadingMessage
