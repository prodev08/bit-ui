import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import Button from 'ui/Button'
import InputField from '../InputField'

const UpdateSignature = ({ name, updateSignature }) => {
  const handleClick = () => {
    updateSignature(true)
  }

  return (
    <div className='update-signature'>
      <Button
        onClick={handleClick}
      >
        Update signature
      </Button>

      <Field name={name} component={InputField} disabled />
    </div>
  )
}

UpdateSignature.propTypes = {
  name: PropTypes.string.isRequired,
  updateSignature: PropTypes.func.isRequired,
}

export default UpdateSignature
