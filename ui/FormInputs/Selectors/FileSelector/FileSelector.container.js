import { connect } from 'react-redux'

import { getAccountType, getComplianceInitialization } from 'store/selectors'

import FileSelector from './FileSelector'

const mapStateToProps = (state) => ({
  accountType: getAccountType(state),
  isCompliance: getComplianceInitialization(state),
})

export default connect(mapStateToProps)(FileSelector)
