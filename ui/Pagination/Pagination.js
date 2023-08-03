import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import InputField from 'ui/FormInputs/InputField'

import queryLimitItems from 'ui/FormInputs/Select/Items/queryLimit'
import { getLimit, setLimit } from 'utils/pagination'
import QueryLimit from './QueryLimit'

const Pagination = ({
  amount,
  className,
  defaultPage,
  onChange,
}) => {
  const [currPage, setCurrPage] = useState(defaultPage)
  const [pageInput, setPageInput] = useState(defaultPage)
  const limit = getLimit()
  const maxPage = Math.ceil(amount / limit)
  const { t } = useTranslation()

  useEffect(() => {
    if (currPage > maxPage) {
      setCurrPage(1)
      setPageInput(1)
    }
  }, [currPage, maxPage])

  const pageInputHandler = (e) => {
    const { value } = e.target

    setPageInput(value)
  }

  const onPageChange = (page) => {
    const nextPage = +(page || pageInput)

    if (currPage === nextPage) {
      return
    }

    if (!Number.isInteger(nextPage) || nextPage < 1 || nextPage > maxPage) {
      setPageInput(currPage)
      return
    }

    setCurrPage(nextPage)
    setPageInput(nextPage)

    onChange({
      offset: (nextPage - 1) * limit,
      amount: limit,
    })
  }

  const prevPage = () => {
    onPageChange(currPage - 1)
  }

  const nextPage = () => {
    onPageChange(currPage + 1)
  }

  const limitChangeHandler = (value) => {
    onChange({
      offset: 0,
      amount: value,
    })

    setCurrPage(1)
    setPageInput(1)
    setLimit(value)
  }

  if (!amount) {
    return null
  }

  const classes = classNames('pagination', className)
  const baseArrowClasses = 'pagination-icon fa'
  const isCurrPageMin = currPage - 1 < 1
  const baseLeftArrowClasses = classNames(baseArrowClasses, {
    'pagination-icon-disabled': isCurrPageMin,
  })
  const isCurrPageMax = currPage + 1 > maxPage
  const baseRightArrowClasses = classNames(baseArrowClasses, {
    'pagination-icon-disabled': isCurrPageMax,
  })

  return amount > queryLimitItems[0].value ? (
    <div className={classes}>
      <i
        className={classNames(baseLeftArrowClasses, 'fa-angle-double-left')}
        onClick={() => onPageChange(1)}
      />
      <i
        className={classNames(baseLeftArrowClasses, 'fa-angle-left')}
        onClick={prevPage}
      />
      {maxPage > 1 && (
        <InputField
          value={pageInput}
          onChange={pageInputHandler}
          onEnterKey={() => onPageChange(pageInput)}
          onBlur={() => onPageChange(pageInput)}
          className='pagination-input'
          selectOnFocus
        />
      )}
      {maxPage === 1 && <span className='pagination-pages'>{currPage}</span>}
      <span className='pagination-pages'>{t('of_pages', { maxPage })}</span>
      <i
        className={classNames(baseRightArrowClasses, 'fa-angle-right')}
        onClick={nextPage}
      />
      <i
        className={classNames(baseRightArrowClasses, 'fa-angle-double-right')}
        onClick={() => onPageChange(maxPage)}
      />

      <QueryLimit limit={limit} onChange={limitChangeHandler} />
    </div>
  ) : null
}

Pagination.propTypes = {
  amount: PropTypes.number.isRequired, // total amount of entries
  className: PropTypes.string,
  defaultPage: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  className: '',
  defaultPage: 1,
}

export default memo(Pagination)
