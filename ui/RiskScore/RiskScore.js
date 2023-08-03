import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import _upperCase from 'lodash/upperCase'
import _sumBy from 'lodash/sumBy'
import _map from 'lodash/map'
import _includes from 'lodash/includes'
import _sortBy from 'lodash/sortBy'
import _range from 'lodash/range'
import _forEach from 'lodash/forEach'
import _size from 'lodash/size'
import _filter from 'lodash/filter'

import { fetchRiskScoreAction } from 'store/actions/compliance.actions'
import { getRiskScore } from 'store/selectors/riskScore.selectors'

import Collapsible from 'ui/Collapsible'
import CustomTable from 'ui/CustomTable'
import { Checkbox } from 'ui/FormInputs'

const availableOptions = [
  {
    className: 'safe',
    ranges: _range(39),
  },
  {
    className: 'warning',
    ranges: _range(40, 109),
  },
  {
    className: 'danger',
    ranges: _range(110, 499),
  },
]

const getRiskClassName = (value) => {
  let res = 'prohibited'
  const options = _sortBy(availableOptions, [({ ranges }) => _size(ranges)])
  _forEach(options, ({ className, ranges }) => {
    if (_includes(ranges, value)) {
      res = className
      return -1
    }
  })
  return res
}

const RiskScore = ({ uid }) => {
  const dispatch = useDispatch()
  const [inactiveRowsVisible, setInactiveRowsVisible] = useState(false)
  const score = useSelector(getRiskScore)
  const grandTotal = _sumBy(score, 'total')
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(fetchRiskScoreAction(uid))
  }, [uid, dispatch])

  const columns = (title) => ([
    {
      Header: t(title),
      accessor: 'title',
    },
    {
      Header: t('risk_score'),
      accessor: 'rating',
    },
    {
      Header: t('yes/no'),
      accessor: 'active',
    },
    {
      Header: t('score'),
      accessor: 'total',
    },
  ])

  const toggleInactiveRows = () => {
    setInactiveRowsVisible((prev) => !prev)
  }

  const translateCells = (cells) => _map(cells, (c) => ({
    ...c,
    title: t(`risk_score_table.${c.title}`),
    active: t(c.active),
  }))

  const filterRows = (rows) => {
    if (inactiveRowsVisible) {
      return translateCells(rows)
    }
    return translateCells(_filter(rows, ['active', 'yes']))
  }

  return (
    <div className='risk-score'>
      <Collapsible
        type='small'
        title={(
          <p className={getRiskClassName(grandTotal)}>
            {t('risk_score')} {grandTotal}
          </p>
        )}
        subTitle={t('show_details')}
      >
        <Checkbox
          checked={inactiveRowsVisible}
          onChange={toggleInactiveRows}
          label={t('show_inactive')}
        />
        {
          _map(score, ({ details, title }, id) => (
            <div key={`${id}-${title}`}>
              <h2>{_upperCase(title)}</h2>
              {
                _map(details, (table) => (
                  <CustomTable
                    key={table.title}
                    sortable={false}
                    data={filterRows(table.details)}
                    columns={columns(table.title)}
                  />
                ))
              }
            </div>
          ),
          )
        }
      </Collapsible>
    </div>
  )
}

RiskScore.propTypes = {
  uid: PropTypes.number.isRequired,
}

export default RiskScore
