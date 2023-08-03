import _memoize from 'lodash/memoize'

const getFileHash = (file = {}) => {
  const { name, size } = file
  return `${name}${size}`
}

const validatedImages = {}

export const getImageValidation = (file) => {
  const hash = getFileHash(file)
  return validatedImages[hash]
}

const _validateImage = _memoize((file) => new Promise((resolve) => {
  const hash = getFileHash(file)

  let objectURL = null
  const image = new Image()

  image.onload = () => {
    validatedImages[hash] = true
    URL.revokeObjectURL(objectURL)
    resolve(true)
  }

  image.onerror = () => {
    validatedImages[hash] = false
    URL.revokeObjectURL(objectURL)
    resolve(false)
  }

  objectURL = URL.createObjectURL(file)
  image.src = objectURL
}), getFileHash)

const validateImage = (file = {}) => _validateImage(file, file.name, file.size)

export default validateImage
