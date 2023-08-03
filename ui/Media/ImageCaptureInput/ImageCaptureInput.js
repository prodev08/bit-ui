import React from 'react'
import PropTypes from 'prop-types'

import Icons from 'icons'
import FileService from 'components/Services/FileService'
import SelectableCard from 'ui/SelectableCard'
import getDocumentType from 'utils/documents/getType'
import DOCUMENT_TYPES from 'var/files/documentTypes'

class ImageCaptureInput extends React.PureComponent {
  static propTypes = {
    capture: PropTypes.string.isRequired,
    onCapture: PropTypes.func.isRequired,
    toggleSpinner: PropTypes.func.isRequired,
  }

  initiateFileSelection = () => {
    const { capture } = this.props
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = this.onFileSelect
    input.capture = capture
    input.style.display = 'none'
    input.click()
  }

  onFileSelect = (e) => {
    const { files } = e.target
    const { onCapture, toggleSpinner } = this.props
    const file = files[0]

    if (getDocumentType(file.name) === DOCUMENT_TYPES.HEIC) {
      toggleSpinner(true)
      FileService.convertHeicToJpg(file)
        .then(({ file }) => {
          toggleSpinner(false)
          onCapture(file)
        })
        .catch(() => {
          toggleSpinner(false)
          onCapture(file)
        })
    } else {
      onCapture(file)
    }
  }

  render() {
    return (
      <SelectableCard
        Icon={Icons.CAMERA}
        onClick={this.initiateFileSelection}
        title='take_photo'
      />
    )
  }
}

export default ImageCaptureInput
