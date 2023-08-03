import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InfiniteScroller from 'react-infinite-scroller'
import _get from 'lodash/get'

import { INITIAL_LOADING_AMOUNT, LOADING_AMOUNT, THRESHOLD } from 'var/infiniteScroll'

import LoadingMessage from './LoadingMessage'

class InfiniteScroll extends React.PureComponent {
  static propTypes = {
    getOptions: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
    showStatus: PropTypes.bool,
    initialLoad: PropTypes.bool,
    className: PropTypes.string,
    element: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
  }

  static defaultProps = {
    showStatus: true,
    initialLoad: true,
    className: '',
    element: undefined,
  }

  state = {
    hasMore: true,
    isLoading: false,
  }

  componentDidMount() {
    const { initialLoad } = this.props
    this._isMounted = true
    if (initialLoad) {
      this.fetchMore({ freshLoad: true })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getItemsNumber = () => {
    const { children } = this.props

    // return length of data array if table is passed
    return children.length || _get(children, ['props', 'data', 'length'])
  }

  getOffset = (freshLoad) => (freshLoad
    ? 0
    : this.getItemsNumber())

  fetchMore = (opts) => {
    const { isLoading } = this.state
    const { getOptions = () => {}, fetchMore } = this.props

    const { freshLoad } = opts

    if (isLoading) {
      return
    }

    const amount = freshLoad
      ? INITIAL_LOADING_AMOUNT
      : LOADING_AMOUNT

    const options = {
      ...getOptions(),
      offset: this.getOffset(freshLoad),
      amount,
      onSuccess: ({ amount: returnedAmount }) => {
        if (!this._isMounted) {
          return
        }

        this.setState({
          hasMore: +amount === +returnedAmount,
          isLoading: false,
        })
      },
      onError: () => {
        if (!this._isMounted) {
          return
        }

        this.setState({
          hasMore: false,
          isLoading: false,
        })
      },
    }

    this.setState({
      isLoading: true,
    }, () => fetchMore(options))
  }

  getLoadingMessage = () => {
    const { hasMore, isLoading } = this.state

    return (
      <LoadingMessage
        hasMore={hasMore}
        isLoading={isLoading}
        isEmpty={!this.getItemsNumber()}
      />
    )
  }

  render() {
    const { hasMore, isLoading } = this.state
    const {
      initialLoad, showStatus, className, element, children,
    } = this.props

    const classes = classNames('infinite-scroll', className)

    return (
      <>
        <InfiniteScroller
          className={classes}
          loadMore={this.fetchMore}
          hasMore={hasMore && isLoading}
          initialLoad={initialLoad}
          threshold={THRESHOLD}
          element={element}
        >
          {children}
        </InfiniteScroller>

        {showStatus && this.getLoadingMessage()}
      </>
    )
  }
}

export default InfiniteScroll
