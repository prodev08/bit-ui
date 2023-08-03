import React from 'react'
import { useTranslation } from 'react-i18next'

import getColumns from 'components/Compliance/Overview/Admins/AdminUsers/AdminUsers.columns'
import CustomTable from '.'

const adminData = [
  {
    user: 'adm1@bitfinex.com',
    level: 0,
    company: 'all',
    logs: 0,
    last_log: null,
    active: true,
    count: 2,
    admin: 'adm1@bitfinex.com',
  },
  {
    user: 'blockPrivileges@something.com',
    level: 1,
    blockPrivilege: true,
    logs: 0,
    last_log: null,
    active: true,
  },
  {
    user: 'google@something.com',
    level: 1,
    logs: 0,
    last_log: null,
    active: true,
  },
  {
    user: 'readOnly@something.com',
    level: 1,
    readOnly: true,
    logs: 0,
    last_log: null,
    active: true,
  },
  {
    user: 'user3@bitfinex.com',
    level: 3,
    logs: 0,
    last_log: null,
    active: true,
  },
  {
    user: 'user@something.com',
    level: 0,
    logs: 0,
    last_log: null,
    active: true,
  },
]

const Template = (args) => {
  const { t } = useTranslation()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}
    >
      <div className='compliance-admins-results'>
        <CustomTable data={adminData} columns={getColumns({ t })} {...args} />
      </div>
    </div>
  )
}
const baseArgTypes = {
  expandable: {
    name: 'expandable',
    type: 'boolean',
  },
  headerUppercase: {
    name: 'headerUppercase',
    type: 'boolean',
  },
  showHeader: {
    name: 'showHeader',
    type: 'boolean',
  },
  small: {
    name: 'small',
    type: 'boolean',
  },
  sort: {
    name: 'sort',
    type: 'boolean',
  },
  sortable: {
    name: 'sortable',
    type: 'boolean',
  },
}
const params = {
  controls: {
    exclude: [
      'cellStyle',
      'className',
      'columns',
      'data',
      'defaultSortDirection',
      'ExpandedComponent',
      'expandedComponentProps',
      'onExpand',
      'onSortChange',
      'rowClassName',
      'rowKeyAccessor',
      'rowStyle',
      'sortColumn',
      'tableClassName',
      'tableStyle',
    ],
  },
}

export const Default = Template.bind({})
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/CustomTable',
  component: CustomTable,
}
