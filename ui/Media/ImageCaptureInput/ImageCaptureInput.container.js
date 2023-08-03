import { connect } from 'react-redux'

import { toggleSpinnerAction } from 'store/actions/app.actions'

import ImageCaptureInput from './ImageCaptureInput'

const mapDispatchToProps = {
  toggleSpinner: toggleSpinnerAction,
}

export default connect(null, mapDispatchToProps)(ImageCaptureInput)
