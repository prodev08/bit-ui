import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import Row from 'ui/Layout/Row'
import Cell from 'ui/Layout/Cell'
import Button from 'ui/Button'
import FileInput from 'ui/FormInputs/FileInput'
import InputField from 'ui/FormInputs/InputField'
import Checkbox from 'ui/FormInputs/Checkbox'
import FileSelect from 'ui/FormInputs/Selectors/FileSelector'
import { OTHER_DOCUMENT } from 'var/files/documentTypes'

const FileUploadForm = ({
  defaultFile,
  handleSubmit,
  isComplianceInitialized,
  isTypeEnabled,
  t,
}) => {
  const isOtherDocumentTypeSelected = defaultFile === OTHER_DOCUMENT

  return (
    <div className='file-upload-form'>
      <Field
        name='file'
        component={FileInput}
        inputLabel={t('helpers.upload_a_doc')}
      />

      {isTypeEnabled && (
        <Row>
          <Cell className='l5 m5 s8'>
            <FileSelect name='default_file' />
          </Cell>
          {isOtherDocumentTypeSelected && (
            <Cell className='l7 m7 s12'>
              <Field
                name='comment'
                component={InputField}
                label={t('add_docs.comment')}
              />
            </Cell>
          )}
        </Row>
      )}

      {isComplianceInitialized && (
        <Row>
          <Cell>
            <Field
              name='is_private'
              component={Checkbox}
              label={t('compliance.private_document')}
              tooltip='compliance.admins_only'
            />
          </Cell>
        </Row>
      )}

      <Button
        type='primary'
        size='large'
        className='mt15'
        onClick={handleSubmit}
      >
        {t('helpers.upload')}
      </Button>
    </div>
  )
}

FileUploadForm.propTypes = {
  defaultFile: PropTypes.string,
  isComplianceInitialized: PropTypes.bool.isRequired,
  isTypeEnabled: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

FileUploadForm.defaultProps = {
  defaultFile: '',
}

export default reduxForm({
  form: 'file-upload',
})(memo(FileUploadForm))
