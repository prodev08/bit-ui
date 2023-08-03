import React from 'react'
import { useTranslation } from 'react-i18next'
import _map from 'lodash/map'

import Select from 'ui/FormInputs/Select'
import SELECT_TRI_STATE from 'var/selectTriStateValues'

const items = [
  { value: SELECT_TRI_STATE.NOT_CONSIDERED, label: 'compliance:not_considered' },
  { value: SELECT_TRI_STATE.TRUE, label: 'compliance:true' },
  { value: SELECT_TRI_STATE.FALSE, label: 'compliance:false' },
]

const TriStateSelect = (props) => {
  const { t } = useTranslation(['translations', 'compliance'])

  return (
    <Select
      {...props}
      blankOption={false}
      isTranslationDisabled
      items={_map(items, ({ value, label }) => ({ value, label: t(label) }))}
      selectedItemExcluded
    />
  )
}

export default TriStateSelect
