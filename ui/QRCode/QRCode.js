import React from 'react'
import PropTypes from 'prop-types'
import ReactQrCode from 'react-qr-code'

const DEFAULT_SIZE = 411
const DEFAULT_PADDING = 27

const QRCode = ({ size, padding, value }) => {
  const style = {
    width: size,
    height: size,
    padding,
  }

  return (
    <div className='qrcode' style={style}>
      <ReactQrCode
        size={size - (padding * 2)}
        value={value}
      />
    </div>
  )
}

QRCode.propTypes = {
  size: PropTypes.number,
  padding: PropTypes.number,
  value: PropTypes.string.isRequired,
}

QRCode.defaultProps = {
  size: DEFAULT_SIZE,
  padding: DEFAULT_PADDING,
}

export default QRCode
