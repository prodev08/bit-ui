export const CAMERA_FACING_MODE = {
  USER: 'user',
  ENVIRONMENT: 'environment',
}

export const CAMERA_FOCUS_MODE = {
  MANUAL: 'manual',
  CONTINUOUS: 'continuous',
}

export const CAMERA_ASPECT_RATIO = {
  COVER: 'cover',
}

export const CAMERA_OVERLAY_SHAPE = {
  NONE: 'none',
  CIRCLE: 'circle',
  RECT: 'rect',
}

export const CAMERA_RECT_RATIO = {
  CARD: 1.586,
  SQUARE: 1,
}

export const CAMERA_FILTERS = {
  NONE: 'none',
  SHARPEN: 'sharpen',
}

export const CAMERA_FILTER_VALUES = {
  SHARPEN: [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0,
  ],
}

export const CAMERA_DEFAULT_WIDTH = 1920
export const CAMERA_DEFAULT_HEIGHT = 1080

export const CAMERA_DEFAULT_FORMAT = 'jpeg'
export const CAMERA_DEFAULT_QUALITY = 1

export const CAMERA_STATE = {
  START: 0,
  STARTING: 1,
  STARTED: 2,
  RESTART: 3,
  STOP: 4,
  STOPPED: 5,
}

export const CAMERA_CONTROLS_HEIGHT = 350

export const CAMERA_BUFFER_SIZE = 5
export const CAMERA_BUFFER_INTERVAL = 500
