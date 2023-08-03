import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { getTheme } from 'store/selectors'

import JsonPretty from './JsonPretty'

const mapStateToProps = (state) => ({
  theme: getTheme(state),
})

export default connect(mapStateToProps)(withRouter(withTranslation()(JsonPretty)))
