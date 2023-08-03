import React, { useState } from 'react'
import _values from 'lodash/values'

import Camera from '.'
import {
  CAMERA_FACING_MODE,
  CAMERA_ASPECT_RATIO,
  CAMERA_OVERLAY_SHAPE,
} from './Camera.constants'

const Template = (args) => {
  const [image, setImage] = useState('')
  const onTakePhoto = (photo) => {
    const photoUrl = URL.createObjectURL(photo)
    setImage(photoUrl)
  }
  const onRetakePhoto = () => {
    if (image) {
      URL.revokeObjectURL(image)
      setImage('')
    }
  }
  return (
    <Camera
      image={image}
      onTakePhoto={onTakePhoto}
      onSecondaryButtonClick={onRetakePhoto}
      {...args}
    />
  )
}

const baseArgs = {
  facingMode: CAMERA_FACING_MODE.USER,
  aspectRatio: CAMERA_ASPECT_RATIO.COVER,
  overlayShape: CAMERA_OVERLAY_SHAPE.CIRCLE,
  overlayVisible: true,
  autoFocusCamera: true,
  title: 'Camera Title',
  subtitle: 'Camera Subtitle',
  shutterButtonVisible: true,
  primaryButtonVisible: true,
  secondaryButtonVisible: true,
  primaryButtonContent: 'Submit Photo',
  secondaryButtonContent: 'Retake Photo',
}
const baseArgTypes = {
  facingMode: {
    name: 'facingMode',
    type: 'select',
    options: _values(CAMERA_FACING_MODE),
  },
  aspectRatio: {
    name: 'aspectRatio',
    type: 'select',
    options: _values(CAMERA_ASPECT_RATIO),
  },
  overlayShape: {
    name: 'overlayShape',
    type: 'select',
    options: _values(CAMERA_OVERLAY_SHAPE),
  },
  overlayVisible: {
    name: 'overlayVisible',
    type: 'boolean',
  },
  autoFocusCamera: {
    name: 'autoFocusCamera',
    type: 'boolean',
  },
  title: {
    name: 'title',
    type: 'string',
  },
  subtitle: {
    name: 'subtitle',
    type: 'string',
  },
  shutterButtonVisible: {
    name: 'shutterButtonVisible',
    type: 'boolean',
  },
  primaryButtonVisible: {
    name: 'primaryButtonVisible',
    type: 'boolean',
  },
  secondaryButtonVisible: {
    name: 'secondaryButtonVisible',
    type: 'boolean',
  },
  primaryButtonContent: {
    name: 'primaryButtonContent',
    type: 'string',
  },
  secondaryButtonContent: {
    name: 'secondaryButtonContent',
    type: 'string',
  },
}
const params = {
  controls: {
    exclude: [
      'width',
      'height',
      'format',
      'quality',
      'filter',
      'icon',
      'image',
      'filename',
      'onTakePhoto',
      'onPrimaryButtonClick',
      'onSecondaryButtonClick',
      'camerasCallback',
      'cameraCapabilitiesCallback',
    ],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Camera',
  component: Camera,
}
