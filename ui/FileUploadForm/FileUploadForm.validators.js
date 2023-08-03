import { validateRequiredInputs, validateTextInputs } from 'utils/validations/validations.helpers'
import { OTHER_DOCUMENT } from 'var/files/documentTypes'

const customValidations = (messages, values) => {
  const { default_file } = values

  if (!default_file || default_file === OTHER_DOCUMENT) {
    validateRequiredInputs(['comment'], values, messages)
    validateTextInputs(['comment'], values, messages)
  }
}

export default customValidations
