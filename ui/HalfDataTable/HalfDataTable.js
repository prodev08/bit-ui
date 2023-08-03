import React from 'react'
import PropTypes from 'prop-types'

import CustomTable from 'ui/CustomTable'

const HalfDataTable = ({ data }) => (
  <div className='half-data-table'>
    <CustomTable
      columns={[
        { accessor: 'key' },
        { accessor: 'value' },
      ]}
      data={data}
      showHeader={false}
      tableClassName='compliance-table half-data-table-table'
      sortable={false}
    />
  </div>
)

HalfDataTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default HalfDataTable
