import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'

import { getTheme } from './utils'

class JsonPretty extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    theme: PropTypes.string.isRequired,
  }

  render() {
    const { data, theme: appTheme } = this.props
    const theme = getTheme(appTheme)

    return (
      <div className='json-pretty'>
        <ReactJson
          collapsed={1}
          displayDataTypes={false}
          displayObjectSize={false}
          name={false}
          onDelete={() => {}} // enables delete
          src={data}
          style={{ backgroundColor: 'inherit' }}
          theme={theme}
        />
      </div>
    )
  }
}

export default JsonPretty
