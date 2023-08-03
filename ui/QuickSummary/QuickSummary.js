import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import _map from 'lodash/map'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _reduce from 'lodash/reduce'
import queryString from 'query-string'
import _sortBy from 'lodash/sortBy'
import _first from 'lodash/first'
import _chunk from 'lodash/chunk'
import _size from 'lodash/size'
import _filter from 'lodash/filter'
import _isNull from 'lodash/isNull'

import { fetchUserAction } from 'store/actions/refinitiv.actions'
import { getRefinitivUserData } from 'store/selectors/refinitiv.selectors'
import { getDocumentsAuthenticityData } from 'store/selectors/documentsAuthenticity.selectors'

import Icons from 'icons'
import Collapsible from 'ui/Collapsible'
import HalfDataTable from 'ui/HalfDataTable'
import { fetchDocumentsAuthenticityAction } from 'store/actions/documentsAuthenticity.actions'
import { setLastCollapsibleOpen } from 'store/actions/collapsible.actions'

const defaultData = [
  'id_pass',
  'id_natl',
  'id_other',
  'id_dl',
  'default_files.selfie',
  'id_res',
  'w_checks',
]

const getFormName = (form) => {
  switch (form) {
    case 'id_pass':
      return 'passport'
    case 'id_natl':
      return 'national_id'
    case 'other':
      return 'other_id'
    default:
      return form
  }
}

const getIconStatus = (status) => {
  switch (status) {
    case 'passed':
    case true:
      return <Icons.CHECK_MARK className='passed' />
    case false:
    case 'failed':
      return <Icons.CROSS className='failed' />
    case 'indecisive':
    case 'error':
      return <Icons.WARNING className='warning' />
    default:
      return null
  }
}

const getSuffix = (type) => {
  if (type === 'w_checks') {
    return 'refinitiv.title'
  }
  return 'reason_submitted_label.au10tix'
}

const QuickSummary = ({ _id }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const fetchUser = useCallback(
    (payload) => dispatch(fetchUserAction(payload)),
    [dispatch],
  )
  const { search } = useLocation()
  const { uid } = queryString.parse(search)
  const goToSection = (section = 'authenticity') => dispatch(setLastCollapsibleOpen(section))

  useEffect(() => {
    dispatch(fetchDocumentsAuthenticityAction({ loading: false, uid }))
  }, [uid, dispatch])

  const storeData = useSelector(getDocumentsAuthenticityData)

  const partialStoreData = _map(storeData, ({
    type,
    authenticity,
    selfie,
    proofOfRes,
    timestamp,
  }) => ({
    type,
    authenticity,
    selfie,
    proofOfRes,
    timestamp,
  }))

  const latestChecked = _first(_sortBy(partialStoreData, 'timestamp'))
  const selfie = _get(latestChecked, ['selfie'])
  const proofOfRes = _get(latestChecked, ['proofOfRes'])

  const refinitiv = useSelector((state) => getRefinitivUserData(state, _id))
  const wChecks = _get(refinitiv, ['data', 'noMatches'])

  useEffect(() => {
    fetchUser({ _id })
  }, [fetchUser, _id])

  let fullData = []

  if (!_isEmpty(partialStoreData)) {
    const userDocumentData = [
      ...partialStoreData,
      {
        type: 'default_files.selfie',
        authenticity: selfie,
      },
      {
        type: 'id_res',
        authenticity: proofOfRes,
      },
      {
        type: 'w_checks',
        authenticity: wChecks,
        onItemClick: () => goToSection('refinitiv'),
      },
    ]

    const dataDictionary = _reduce(userDocumentData, (acc, curr) => ({
      ...acc,
      [curr.type]: {
        key: getIconStatus(curr.authenticity),
        value: `${t(curr.type)} (${t(getSuffix(curr.type))})`,
        onItemClick: curr.onItemClick || goToSection,
      },
    }), {})

    const getLine = (key) => dataDictionary[getFormName(key)] || {}

    fullData = _map(defaultData, getLine)
  }

  const filteredData = _filter(fullData, (d) => !_isEmpty(d) && !_isNull(d.key))

  const chunkSize = Math.ceil(_size(filteredData) / 2)

  const [first = [], second = []] = _chunk(filteredData, chunkSize)

  return (
    <div className='quick-summary'>
      <Collapsible
        isOpenByDefault
        type='small'
        title={(<p>{t('third_party_checks_summary')}</p>)}
      >
        <HalfDataTable
          data={first}
        />
        <HalfDataTable
          data={second}
        />
      </Collapsible>
    </div>
  )
}

QuickSummary.propTypes = {
  _id: PropTypes.string.isRequired,
}

export default QuickSummary
