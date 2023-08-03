const MAGNIFICATION_MULT = 2

export const getDrawImageParams = ({
  img, width, height, rotation,
}) => {
  switch (rotation) {
    case 0:
    default:
      return [img, 0, 0, width, height]
    case 180:
      return [img, -width / 2, -height / 2, width, height]
    case 90:
    case 270:
      return [img, -height / 2, -width / 2, height, width]
  }
}

export const drawCanvasImage = ({
  canvas, img, width, height, rotation,
}) => {
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  context.save()
  if (rotation !== 0) {
    context.translate(width / 2, height / 2)
    context.rotate(rotation * (Math.PI / 180))
  }
  const drawImageParams = getDrawImageParams({
    img,
    width,
    height,
    rotation,
  })
  context.drawImage(...drawImageParams)
  context.restore()
}

export const getRenderedCanvasSize = ({ img, rotation }) => {
  let { width, height } = img

  const maxWidth = window.innerWidth * 0.8
  const maxHeight = window.innerHeight * 0.7

  if ([90, 270].includes(rotation)) {
    const temp = width
    width = height
    height = temp
  }

  if (width >= height) {
    if (width > maxWidth) {
      height /= width / maxWidth
      width = maxWidth
    }
    if (height > maxHeight) {
      width /= height / maxHeight
      height = maxHeight
    }
  } else {
    if (height > maxHeight) {
      width /= height / maxHeight
      height = maxHeight
    }
    if (width > maxWidth) {
      height /= width / maxWidth
      width = maxWidth
    }
  }

  return {
    width,
    height,
  }
}

export const getMagnificationCanvas = ({
  img,
  width: renderedWidth,
  height: renderedHeight,
  rotation,
}) => {
  const canvas = document.createElement('canvas')
  const width = renderedWidth * MAGNIFICATION_MULT
  const height = renderedHeight * MAGNIFICATION_MULT

  drawCanvasImage({
    canvas,
    img,
    width,
    height,
    rotation,
  })

  return canvas
}
