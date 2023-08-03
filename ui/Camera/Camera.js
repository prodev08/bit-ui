import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isEqual from 'lodash/isEqual'
import _size from 'lodash/size'
import _values from 'lodash/values'

import Icons from 'icons'
import useGeolocation from 'hooks/useGeolocation'
import useElementSize from 'hooks/useElementSize'
import usePrev from 'hooks/usePrev'

import {
  CAMERA_ASPECT_RATIO,
  CAMERA_FACING_MODE,
  CAMERA_DEFAULT_WIDTH,
  CAMERA_DEFAULT_HEIGHT,
  CAMERA_DEFAULT_FORMAT,
  CAMERA_DEFAULT_QUALITY,
  CAMERA_FILTERS,
  CAMERA_OVERLAY_SHAPE,
  CAMERA_STATE,
  CAMERA_CONTROLS_HEIGHT,
  CAMERA_BUFFER_SIZE,
  CAMERA_BUFFER_INTERVAL,
} from './Camera.constants'
import {
  getCameras,
  initCameraStream,
  stopCameraStream,
  takeCameraPhoto,
  setCameraSettings,
  getOverlayShapeProps,
  getFacingModeCameras,
  getNextCameraDeviceId,
  checkIsAutoFocusCamera,
} from './Camera.helpers'
import CameraOverlay from './Camera.Overlay'
import ShutterButton from './ShutterButton'

export const Camera = forwardRef((props, ref) => {
  const {
    facingMode,
    aspectRatio,
    isCountdownDisabled,
    width,
    height,
    format,
    quality,
    filter,

    overlayShape,
    overlayVisible,
    shouldNotCropImage,

    autoFocusCamera,
    imageBuffering,

    icon,
    title,
    subtitle,
    image,
    filename,

    shutterButtonVisible,
    primaryButtonVisible,
    secondaryButtonVisible,
    primaryButtonContent,
    secondaryButtonContent,

    onTakePhoto,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    onImageBufferUpdate,
    camerasCallback,
    cameraCapabilitiesCallback,

    imageHasIssue,
  } = props

  const { t } = useTranslation()

  const player = useRef(null)
  const canvas = useRef(null)
  const container = useRef(null)
  const isMounted = useRef(false)
  const bufferTimer = useRef(null)

  const [stream, setStream] = useState(null)
  const [deviceId, setDeviceId] = useState(null)
  const [cameraState, setCameraState] = useState()
  const [cameras, setCameras] = useState([])
  const [cameraCapabilities, setCameraCapabilities] = useState({})
  const [switchedCameras, setSwitchedCameras] = useState(0)
  const [notSupported, setNotSupported] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)

  const [countdownStarted, setCountdownStarted] = useState(false)
  const titlePrev = usePrev(title)

  useEffect(() => {
    if (countdownStarted && titlePrev !== title) {
      setCountdownStarted(false)
    }
  }, [countdownStarted, setCountdownStarted, title, titlePrev])

  const isCanceled = useCallback(() => !isMounted.current, [])
  const [geoPosition] = useGeolocation(isCanceled)

  const isCoverRatio = _isEqual(aspectRatio, CAMERA_ASPECT_RATIO.COVER)
  const isUserFacing = _isEqual(facingMode, CAMERA_FACING_MODE.USER)

  const {
    width: containerWidth,
    height: containerHeight,
  } = useElementSize(container)
  const {
    overlayShapeProps = {},
    overlayShapeMargin = {},
  } = useMemo(() => getOverlayShapeProps({
    type: overlayShape,
    width: containerWidth,
    height: containerHeight,
    maxHeight: containerHeight - CAMERA_CONTROLS_HEIGHT,
  }), [overlayShape, containerWidth, containerHeight])

  const takePhoto = () => {
    if (
      notSupported ||
      permissionDenied ||
      _size(cameras) < 1 ||
      !canvas.current
    ) {
      return
    }
    setIsFlashing(true)
    takeCameraPhoto({
      player: player.current,
      container: container.current,
      canvas: canvas.current,
      setPhoto: onTakePhoto,
      name: filename,
      mirorred: isUserFacing,
      dimensions: shouldNotCropImage ? {} : overlayShapeProps,
      format,
      quality,
      filter,
      geoPosition,
    })
  }

  const setSettings = (settings) => {
    setCameraSettings(stream, settings)
  }

  const initCamera = useCallback(() => {
    initCameraStream({
      facingMode,
      width,
      height,
      deviceId,
      setStream,
      setCameras,
      setCameraCapabilities,
      setNotSupported,
      setPermissionDenied,
      isCanceled,
    })
  }, [facingMode, width, height, deviceId, isCanceled])

  const stopCamera = useCallback(() => {
    stopCameraStream(stream)
    setStream(null)
  }, [stream])

  const switchCamera = useCallback(
    (deviceId) => {
      let nextDeviceId = deviceId

      if (!nextDeviceId) {
        const facingModeCameras = getFacingModeCameras({
          cameras,
          facingMode,
        })
        nextDeviceId = getNextCameraDeviceId({
          cameras: facingModeCameras,
          cameraCapabilities,
          facingMode,
        })
      }

      if (nextDeviceId) {
        setDeviceId(nextDeviceId)
        setCameraState(CAMERA_STATE.RESTART)
      }
      return nextDeviceId
    },
    [cameras, cameraCapabilities, facingMode],
  )

  const switchToAutoFocusCamera = useCallback(() => {
    if (
      checkIsAutoFocusCamera({
        cameraCapabilities,
        facingMode,
      })
    ) {
      return false
    }

    const facingModeCameras = getFacingModeCameras({
      cameras,
      facingMode,
    })

    const numberOfCameras = _size(facingModeCameras)
    if (numberOfCameras > 1 && switchedCameras < numberOfCameras) {
      switchCamera()
      setSwitchedCameras((value) => value + 1)
    }
    return true
  }, [
    cameras,
    cameraCapabilities,
    facingMode,
    switchedCameras,
    switchCamera,
  ])

  const stopBuffer = useCallback(() => {
    if (bufferTimer.current) {
      clearInterval(bufferTimer.current)
      bufferTimer.current = null
    }
  }, [])

  const startBuffer = useCallback(() => {
    stopBuffer()

    let buffer = []

    const setPhoto = (photo) => {
      const newBuffer = [...buffer]
      if (newBuffer.length === CAMERA_BUFFER_SIZE) {
        newBuffer.shift(photo)
      }
      newBuffer.push(photo)
      buffer = newBuffer
      onImageBufferUpdate(buffer)
    }

    const takePhoto = () => {
      takeCameraPhoto({
        player: player.current,
        container: container.current,
        canvas: canvas.current,
        name: filename,
        mirorred: isUserFacing,
        dimensions: shouldNotCropImage ? {} : overlayShapeProps,
        noImageMetaData: true,
        format,
        quality,
        setPhoto,
      })
    }

    bufferTimer.current = setInterval(takePhoto, CAMERA_BUFFER_INTERVAL)
  }, [
    filename,
    format,
    quality,
    isUserFacing,
    overlayShapeProps,
    onImageBufferUpdate,
    shouldNotCropImage,
    stopBuffer,
  ])

  useImperativeHandle(ref, () => ({
    takePhoto,
    setSettings,
    switchCamera,
    switchToAutoFocusCamera,
  }))

  useEffect(() => {
    camerasCallback(cameras)
  }, [cameras, camerasCallback])

  useEffect(() => {
    cameraCapabilitiesCallback(cameraCapabilities)
  }, [cameraCapabilities, cameraCapabilitiesCallback])

  useEffect(() => {
    if (player && player.current) {
      player.current.srcObject = stream
    }

    return () => {
      stopCameraStream(stream)
    }
  }, [stream])

  useEffect(() => {
    isMounted.current = true

    getCameras({
      setCameras,
      isCanceled,
    })
    setCameraState(CAMERA_STATE.START)

    return () => {
      isMounted.current = false
    }
  }, [isCanceled])

  useEffect(() => {
    setDeviceId(null)
    setSwitchedCameras(0)
    setCameraState((state) => (
      !_isEqual(state, CAMERA_STATE.START)
        ? CAMERA_STATE.RESTART
        : state
    ))
  }, [facingMode])

  useEffect(() => {
    switch (cameraState) {
      case CAMERA_STATE.START:
        setCameraState(CAMERA_STATE.STARTING)
        initCamera()
        break
      case CAMERA_STATE.STARTING:
        if (stream) {
          setCameraState(CAMERA_STATE.STARTED)
        }
        break
      case CAMERA_STATE.STARTED:
        if (autoFocusCamera) {
          switchToAutoFocusCamera()
        }
        break
      case CAMERA_STATE.RESTART:
        stopCamera()
        setCameraState(CAMERA_STATE.START)
        break
      case CAMERA_STATE.STOP:
        stopCamera(stream)
        setCameraState(CAMERA_STATE.STOPPED)
        break
      default:
        break
    }
  }, [
    cameraState,
    stream,
    autoFocusCamera,
    initCamera,
    stopCamera,
    switchToAutoFocusCamera,
  ])

  useEffect(() => {
    const shouldBuffer = imageBuffering && cameraState === CAMERA_STATE.STARTED
    if (!bufferTimer.current && shouldBuffer) {
      startBuffer()
    } else if (bufferTimer.current && !shouldBuffer) {
      stopBuffer()
    }
  }, [imageBuffering, cameraState, startBuffer, stopBuffer])

  useEffect(() => () => stopBuffer(), [stopBuffer])

  const containerClasses = classNames(
    'camera-container',
    { 'camera-container-cover': isCoverRatio },
  )
  const videoClasses = classNames(
    'camera-video',
    { 'camera-video-mirrored': isUserFacing },
  )

  const {
    x: overlayShapeLeft,
    y: overlayShapeTop,
    width: overlayShapeWidth,
    height: overlayShapeHeight,
    rx: overlayShapeBorderRadius,
  } = overlayShapeProps
  const imageStyle = {
    left: overlayShapeLeft,
    top: overlayShapeTop,
    width: overlayShapeWidth,
    height: overlayShapeHeight,
    borderRadius: overlayShapeBorderRadius,
    backgroundImage: `url(${image})`,
  }

  return (
    <div
      ref={container}
      className={containerClasses}
    >
      <div className='camera-wrapper'>
        <video
          id='video'
          ref={player}
          className={videoClasses}
          muted
          autoPlay
          playsInline
        />
        <canvas
          id='canvas'
          ref={canvas}
          className='camera-canvas'
        />
        {image && (
          <div
            className='camera-image'
            style={imageStyle}
          />
        )}
        {overlayVisible && (
          <CameraOverlay
            width={containerWidth}
            height={containerHeight}
            shapeType={overlayShape}
            shapeProps={overlayShapeProps}
            isFlashing={isFlashing}
            onStopFlashing={() => setIsFlashing(false)}
          />
        )}
        <div
          className='camera-content'
          style={{ ...overlayShapeMargin }}
        >
          {icon && (
            <div className='camera-icon'>
              {icon}
            </div>
          )}
          <div className='camera-controls'>
            {(isCountdownDisabled || (!isCountdownDisabled && !countdownStarted)) && (
            <>
                {title && <div className='camera-title'>{title}</div>}
                {subtitle && <div className='camera-subtitle'>{subtitle}</div>}
              {imageHasIssue && <Icons.EXCLAMATION_CIRCLE className='camera-controls-issue' />}
            </>
            )}
            {!isCountdownDisabled && countdownStarted && (
              <div className='camera-controls-hold-still'>{t('hold_still')}</div>
            )}
            {imageHasIssue && <Icons.EXCLAMATION_CIRCLE className='camera-controls-issue' />}
            <div className='camera-controls-spacer' />
            {shutterButtonVisible && (
              <ShutterButton
                isCountdownDisabled={isCountdownDisabled}
                setCountdownStarted={setCountdownStarted}
                takePhoto={takePhoto}
              />
            )}
            {primaryButtonVisible && (
              <button
                type='button'
                className='camera-action-button camera-action-button-primary'
                onClick={onPrimaryButtonClick}
              >
                {primaryButtonContent}
              </button>
            )}
            {secondaryButtonVisible && (
              <button
                type='button'
                className='camera-action-button camera-action-button-secondary'
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonContent}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

Camera.propTypes = {
  facingMode: PropTypes.oneOf(_values(CAMERA_FACING_MODE)),
  aspectRatio: PropTypes.oneOf(_values(CAMERA_ASPECT_RATIO)),
  isCountdownDisabled: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  format: PropTypes.string,
  quality: PropTypes.number,
  filter: PropTypes.oneOf(_values(CAMERA_FILTERS)),

  overlayShape: PropTypes.oneOf(_values(CAMERA_OVERLAY_SHAPE)),
  overlayVisible: PropTypes.bool,
  shouldNotCropImage: PropTypes.bool,

  autoFocusCamera: PropTypes.bool,
  imageBuffering: PropTypes.bool,

  icon: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  image: PropTypes.string,
  filename: PropTypes.string,

  shutterButtonVisible: PropTypes.bool,
  primaryButtonVisible: PropTypes.bool,
  secondaryButtonVisible: PropTypes.bool,
  primaryButtonContent: PropTypes.node,
  secondaryButtonContent: PropTypes.node,

  onTakePhoto: PropTypes.func,
  onPrimaryButtonClick: PropTypes.func,
  onSecondaryButtonClick: PropTypes.func,
  onImageBufferUpdate: PropTypes.func,
  camerasCallback: PropTypes.func,
  cameraCapabilitiesCallback: PropTypes.func,

  imageHasIssue: PropTypes.bool,
}

Camera.defaultProps = {
  facingMode: CAMERA_FACING_MODE.USER,
  aspectRatio: CAMERA_ASPECT_RATIO.COVER,
  isCountdownDisabled: false,
  width: CAMERA_DEFAULT_WIDTH,
  height: CAMERA_DEFAULT_HEIGHT,
  format: CAMERA_DEFAULT_FORMAT,
  quality: CAMERA_DEFAULT_QUALITY,
  filter: CAMERA_FILTERS.NONE,

  overlayShape: CAMERA_OVERLAY_SHAPE.NONE,
  overlayVisible: false,
  shouldNotCropImage: false,

  autoFocusCamera: true,
  imageBuffering: false,

  icon: '',
  title: '',
  subtitle: '',
  image: '',
  filename: '',

  shutterButtonVisible: false,
  primaryButtonVisible: false,
  secondaryButtonVisible: false,
  primaryButtonContent: '',
  secondaryButtonContent: '',

  onTakePhoto: () => {},
  onPrimaryButtonClick: () => {},
  onSecondaryButtonClick: () => {},
  onImageBufferUpdate: () => {},
  camerasCallback: () => {},
  cameraCapabilitiesCallback: () => {},

  imageHasIssue: false,
}

export default Camera
