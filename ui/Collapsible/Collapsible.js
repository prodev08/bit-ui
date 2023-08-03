import React, {
  memo, useEffect, useRef, useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isUndefined from 'lodash/isUndefined'
import { Collapse } from '@blueprintjs/core'
import { useDispatch, useSelector } from 'react-redux'
import { getLastOpenedCollapsible } from 'store/selectors/collapsible.selectors'
import { setLastCollapsibleOpen } from 'store/actions/collapsible.actions'

const Collapsible = ({
  id,
  type,
  title,
  isOpen,
  subTitle,
  onToggle,
  children,
  className,
  onFirstOpen,
  isOpenByDefault,
  keepChildrenMounted,
}) => {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(isOpen || isOpenByDefault)
  let wasOpened = isOpen || isOpenByDefault
  const dispatch = useDispatch()
  const lastOpenedCollapsible = useSelector(getLastOpenedCollapsible)
  const ref = useRef()

  useEffect(() => {
    if (id && lastOpenedCollapsible === id) {
      setIsCollapsibleOpen(true)
      ref.current.scrollIntoView({
        behavior: 'smooth',
      })
      dispatch(setLastCollapsibleOpen(''))
    }
  }, [id, lastOpenedCollapsible, dispatch])

  const onToggleHandler = () => {
    if (_isUndefined(isOpen)) {
      setIsCollapsibleOpen(!isCollapsibleOpen)

      onToggle(!isCollapsibleOpen)
      if (!isCollapsibleOpen && !wasOpened) {
        wasOpened = true
        onFirstOpen()
      }

      return
    }

    onToggle(!isOpen)
    if (!isOpen && !wasOpened) {
      wasOpened = true
      onFirstOpen()
    }
  }

  const isOpenState = (isOpen !== undefined)
    ? isOpen
    : isCollapsibleOpen

  const classes = classNames(
    'collapsible',
    { 'collapsible--active': isOpenState },
    type && `collapsible--${type}`,
    className,
  )

  return (
    <div className={classes} ref={ref}>
      <div className='collapsible-header' onClick={onToggleHandler}>
        {title}
        {!isOpenState && <p>{subTitle}</p>}
        <span className='collapsible-header-icon--wrapper'>
          <i className='collapsible-header-icon--arrow arrow-down-icon' />
        </span>
      </div>
      <Collapse className='collapsible-body' isOpen={isOpenState} keepChildrenMounted={keepChildrenMounted}>
        <div className='collapsible-body-wrapper'>
          {children}
        </div>
      </Collapse>
    </div>
  )
}

Collapsible.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['', 'small']),
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.string,
  onToggle: PropTypes.func,
  onFirstOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  isOpenByDefault: PropTypes.bool,
  className: PropTypes.string,
  keepChildrenMounted: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

Collapsible.defaultProps = {
  id: '',
  type: '',
  subTitle: null,
  onToggle: () => {},
  onFirstOpen: () => {},
  isOpen: undefined,
  isOpenByDefault: undefined,
  className: '',
  keepChildrenMounted: true,
}

export default memo(Collapsible)
