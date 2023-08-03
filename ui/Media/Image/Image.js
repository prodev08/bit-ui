import React, {
  memo, useCallback, useEffect, useRef, useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { drawCanvasImage, getMagnificationCanvas, getRenderedCanvasSize } from './utils'

const LENS_SIZE = 300

const Image = ({
  className, isContextMenuDisabled, rotation, src,
}) => {
  const canvasRef = useRef()
  const lensRef = useRef({
    style: {},
  })
  const imgRef = useRef()
  const ref = useRef()

  const widthRef = useRef()
  const heightRef = useRef()

  const [isLoaded, setIsLoaded] = useState(false)

  const setRotatedImage = (rotation) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const { width, height } = getRenderedCanvasSize({
      img: imgRef.current,
      rotation,
    })
    widthRef.current = width
    heightRef.current = height

    drawCanvasImage({
      canvas,
      img: imgRef.current,
      width,
      height,
      rotation,
    })
  }

  const onContextMenu = (e) => {
    if (isContextMenuDisabled) {
      e.preventDefault()
      return false
    }
  }

  const initMagnification = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const magnificationCanvas = getMagnificationCanvas({
      img: imgRef.current,
      width: widthRef.current,
      height: heightRef.current,
      rotation,
    })

    const lens = lensRef.current
    lens.style.width = `${LENS_SIZE}px`
    lens.style.height = `${LENS_SIZE}px`
    lens.style.background = `url("${magnificationCanvas.toDataURL()}") no-repeat`

    ref.current.appendChild(lens)

    const onMagnifierPositionUpdate = ({ offsetX, offsetY }) => {
      let xPerc = (offsetX / widthRef.current) * 100
      let yPerc = (offsetY / heightRef.current) * 100

      if (offsetX > 0.01 * widthRef.current) {
        xPerc += 0.15 * xPerc
      }

      if (offsetY >= 0.01 * heightRef.current) {
        yPerc += 0.15 * yPerc
      }

      lens.style.backgroundPositionX = `${xPerc - 9}%`
      lens.style.backgroundPositionY = `${yPerc - 9}%`

      lens.style.left = `${offsetX - LENS_SIZE / 2}px`
      lens.style.top = `${offsetY - LENS_SIZE / 2}px`
    }

    canvas.addEventListener('mouseenter', onMagnifierPositionUpdate)
    canvas.addEventListener('mousemove', onMagnifierPositionUpdate)
  }, [rotation])

  const updateMagnification = useCallback(() => {
    const magnificationCanvas = getMagnificationCanvas({
      img: imgRef.current,
      width: widthRef.current,
      height: heightRef.current,
      rotation,
    })

    const lens = lensRef.current
    lens.style.background = `url("${magnificationCanvas.toDataURL()}") no-repeat`
  }, [rotation])

  useEffect(() => {
    const img = document.createElement('img')
    imgRef.current = img

    img.onload = () => {
      setIsLoaded(true)
      setRotatedImage(rotation)
      initMagnification()
    }
    img.src = src
  }, [initMagnification, rotation, src])

  useEffect(() => {
    setRotatedImage(rotation)
    updateMagnification()
  }, [rotation, updateMagnification])

  const classes = classNames('image', className)

  return (
    <div className={classes} ref={ref}>
      <canvas className='image-canvas' onContextMenu={onContextMenu} ref={canvasRef} />
      {isLoaded && <div className='lens' ref={lensRef} />}
    </div>
  )
}

Image.propTypes = {
  className: PropTypes.string,
  isContextMenuDisabled: PropTypes.bool,
  rotation: PropTypes.oneOf([0, 90, 180, 270]),
  src: PropTypes.string,
}

Image.defaultProps = {
  className: '',
  isContextMenuDisabled: false,
  rotation: 0,
  src: '',
}

export default memo(Image)
