import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getComplianceInitialization } from 'store/selectors'

import BusinessTypeSelect from './BusinessTypeSelect'

const mapStateToProps = (state) => ({
  isCompliance: getComplianceInitialization(state),
})

export default connect(mapStateToProps)(withTranslation()(BusinessTypeSelect))
