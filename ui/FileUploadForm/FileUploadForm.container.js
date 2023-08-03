import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { formValueSelector, reset } from 'redux-form'

import { saveOneDocumentAction } from 'store/actions/documents.actions'
import { showModalAction } from 'store/actions/modals.actions'

import FileUploadForm from './FileUploadForm'

const mapStateToProps = (state) => ({
  defaultFile: formValueSelector('file-upload')(state, 'default_file'),
  isComplianceInitialized: state.app.isComplianceInitialized,
})

const mapDispatchToProps = {
  resetForm: () => reset('file-upload'),
  saveDocument: saveOneDocumentAction,
  showModal: showModalAction,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(FileUploadForm)
