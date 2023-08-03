import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field, change } from 'redux-form'
import { useTranslation } from 'react-i18next'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'
import { Classes } from '@blueprintjs/core'

import InputField from 'ui/FormInputs/InputField'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import WarningLabel from 'ui/FormInputs/WarningLabel'
import triggerPreview from 'utils/documents/triggerPreview'
import { validateFile } from 'utils/validations/validators'
import getDocumentType from 'utils/documents/getType'
import { ACCEPTED_FORMATS } from 'var/files/extensions'
import DOCUMENT_TYPES from 'var/files/documentTypes'
import withMissingInputValueMessage from 'HOC/withMissingInputValueMessage'

import submitFile from './FileInput.submitFile'
import validateImage from './validateImage'

const FileInput = ({
  input: { name: inputName, value: inputValue },
  inputLabel,
  autoSubmit,
  disabled,
  onAutoSubmit,
  preview,
  meta: {
    error, submitFailed, pristine, dispatch, form,
  },
  requestedForm,
  owner_id,
  missingValueMessage,
  acceptedFormats,
}) => {
  const { t } = useTranslation()

  const getInputName = () => `${inputName}_filename`

  const onChange = async (e) => {
    const { value, files } = e.target

    const filename = value.match(/[^\\/]+$/)
    const fileData = {
      ...inputValue,
      owner_id,
      data: files[0],
      type: inputName,
      updated: new Date().getTime(),
    }

    // prevents from removing data on escape key while choosing a file
    if (!value) {
      return
    }

    const name = _get(files, [0, 'name'], '')
    if (getDocumentType(name) === DOCUMENT_TYPES.IMAGE) {
      await validateImage(files[0])
    }

    const updateFileData = (fileData) => {
      // set file input field value to file data
      dispatch(change(form, inputName, files.length ? fileData : ''))

      // set name input field value to file name
      dispatch(change(form, getInputName(), filename ? filename[0] : ''))
    }

    updateFileData(fileData)

    if (autoSubmit && !validateFile(fileData)) {
      submitFile({
        file: fileData,
        data: {
          requestedForm,
        },
        form,
        updateFileData,
        onSuccess: onAutoSubmit,
      })
    }
  }

  const onClick = (e) => {
    e.target.value = null // allows selecting same file from file picker
  }

  const getFilenameInput = () => {
    const documentId = _get(inputValue, ['_id'])
    const isPreviewEnabled = preview && !_isEmpty(inputValue) && documentId

    const filenameClasses = classNames('file-input-filename', {
      'file-input-filename--preview': isPreviewEnabled,
    })

    const filenameClickHandler = isPreviewEnabled
      ? () => {
        triggerPreview(inputValue)
      }
      : undefined

    return (
      <Field
        name={getInputName()}
        className={filenameClasses}
        component={InputField}
        label={inputLabel}
        disabled
        onClick={filenameClickHandler}
      />
    )
  }

  const showError = (submitFailed || (autoSubmit && !pristine && inputValue)) && error
  const showWarning = !showError && missingValueMessage

  const classes = classNames('file-input', {
    error: showError,
    warning: showWarning,
  })

  const fileInputTitle = !_isEmpty(inputValue) ? '' : t('no_file_chosen')

  return (
    <div className={classes}>
      <div className='file-input-wrapper'>
        <div className={classNames('file-input-loader', Classes.BUTTON)}>
          <i className='fa fa-paperclip' />
          <span className='file-input-loader-title'>{t('helpers.choose_file')}</span>

          <input
            className='file-input-loader-input'
            disabled={disabled}
            name={inputName}
            type='file'
            accept={acceptedFormats}
            title={fileInputTitle}
            onClick={onClick}
            onChange={onChange}
          />
        </div>

        {getFilenameInput()}
      </div>

      {showError && <ErrorLabel error={error} />}
      {showWarning && <WarningLabel warning={missingValueMessage} />}
    </div>
  )
}

FileInput.propTypes = {
  acceptedFormats: PropTypes.string,
  autoSubmit: PropTypes.bool,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  inputLabel: PropTypes.string,
  meta: PropTypes.object.isRequired,
  missingValueMessage: PropTypes.string,
  onAutoSubmit: PropTypes.func,
  owner_id: PropTypes.string,
  preview: PropTypes.bool,
  requestedForm: PropTypes.string,
}

FileInput.defaultProps = {
  acceptedFormats: ACCEPTED_FORMATS,
  autoSubmit: false,
  disabled: false,
  inputLabel: '',
  missingValueMessage: undefined,
  onAutoSubmit: () => {},
  owner_id: undefined,
  preview: false,
  requestedForm: undefined,
}

export default withMissingInputValueMessage(FileInput)
