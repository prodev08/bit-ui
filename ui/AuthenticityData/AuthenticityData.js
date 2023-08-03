import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import queryString from 'query-string'
import _includes from 'lodash/includes'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import { Position } from '@blueprintjs/core'

import { fetchDocumentsAuthenticityAction } from 'store/actions/documentsAuthenticity.actions'
import { getDocumentsAuthenticityData } from 'store/selectors/documentsAuthenticity.selectors'

import JsonDisplay from 'components/Services/JsonDisplay'
import { getFormName } from 'components/FormsUpdate/DocumentForm/DocumentForm.helpers'
import { Checkbox } from 'ui/FormInputs'
import InfoIcon from 'ui/InfoIcon'
import JSONFormat from 'ui/JSONFormat'
import { AUTHENTICITY_TYPES, AUTHENTICITY_TRANSLATIONS } from 'var/authenticityTypes'

import { getFormattedAuthenticityData, getRecentDocuments } from './utils'

const getAuthenticityFromDoc = ({ authenticity = AUTHENTICITY_TYPES.PROCESSING, error }) => {
  if (error && authenticity === AUTHENTICITY_TYPES.PROCESSING) {
    return AUTHENTICITY_TYPES.ERROR
  }
  return authenticity
}

const AuthenticityData = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [shouldShowAllDocs, setShouldShowAllDocs] = useState(false)

  const data = useSelector(getDocumentsAuthenticityData)
  const docs = shouldShowAllDocs ? data : getRecentDocuments(data)

  const { search } = useLocation()
  const { uid } = queryString.parse(search)

  useEffect(() => {
    dispatch(fetchDocumentsAuthenticityAction({ loading: false, uid }))
  }, [uid, dispatch])

  return !_isEmpty(docs) ? (
    <>
      <Checkbox
        checked={shouldShowAllDocs}
        label={t('show_all_docs')}
        onChange={({ target }) => setShouldShowAllDocs(target.checked)}
      />
      {_map(docs, (document) => {
        const {
          isAddressOnly, proofOfResid, selfie = AUTHENTICITY_TYPES.PROCESSING, type, _id,
        } = document
        const authenticity = isAddressOnly
          ? (proofOfResid || AUTHENTICITY_TYPES.PROCESSING)
          : getAuthenticityFromDoc(document)
        const formName = isAddressOnly ? 'id_res' : getFormName(type)
        const authenticityClasses = classNames(
          'authenticity-data-authenticity',
          `authenticity-data-authenticity-${authenticity}`,
          'clickable',
        )

        const { formattedData, formattedDataShort } = getFormattedAuthenticityData(document)

        return (
          <div key={_id} className='authenticity-data'>
            <span>{t(formName)}: </span>
            <span className={authenticityClasses} onClick={() => JsonDisplay.open(formattedData)}>
              {_includes(
                [
                  AUTHENTICITY_TYPES.PASSED,
                  AUTHENTICITY_TYPES.FAILED,
                  AUTHENTICITY_TYPES.INDECISIVE,
                ],
                authenticity,
              ) ? (
                <JSONFormat data={formattedDataShort} position={Position.RIGHT}>
                  {t(AUTHENTICITY_TRANSLATIONS[authenticity])}
                </JSONFormat>
                ) : (
                  t(AUTHENTICITY_TRANSLATIONS[authenticity])
                )}
            </span>
            {!_includes([AUTHENTICITY_TYPES.PASSED, AUTHENTICITY_TYPES.PROCESSING], selfie) && (
              <InfoIcon className='ml10'>
                {t('default_files.selfie')}: {t(AUTHENTICITY_TRANSLATIONS[selfie])}
              </InfoIcon>
            )}
          </div>
        )
      })}
    </>
  ) : (
    <div>{t('no_data')}</div>
  )
}

export default AuthenticityData
