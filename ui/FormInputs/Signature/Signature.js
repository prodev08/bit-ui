import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import SignatureCanvas from 'react-signature-canvas'
import withMissingInputValueMessage from 'HOC/withMissingInputValueMessage'
import WarningLabel from '../WarningLabel'

class Signature extends PureComponent {
  static propTypes = {
    canvasProps: PropTypes.shape({
      className: PropTypes.string,
      name: PropTypes.string,
    }),
    className: PropTypes.string,
    input: PropTypes.shape({ name: PropTypes.string }).isRequired,
    missingValueMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    setMissingValueMessageInvisible: PropTypes.func,
    value: PropTypes.string,
  }

  static defaultProps = {
    canvasProps: {},
    className: '',
    missingValueMessage: undefined,
    setMissingValueMessageInvisible: () => {},
    value: '',
  }

  signatureRef = React.createRef()

  componentDidMount() {
    const { value } = this.props

    if (value) {
      const signature = this.getSignature()
      signature.fromDataURL(value)
    }
  }

  getSignature = () => this.signatureRef.current

  onChange = () => {
    const { onChange } = this.props

    const signature = this.getSignature()
    if (signature.isEmpty()) {
      onChange('')
      return
    }

    const dataURL = signature.toDataURL()
    onChange(dataURL)
  }

  onClear = () => {
    this.getSignature().clear()
    this.onChange()
  }

  onEnd = () => {
    this.onChange()
  }

  showCanvas = (e) => {
    e.stopPropagation()

    const { setMissingValueMessageInvisible } = this.props
    setMissingValueMessageInvisible()
  }

  render() {
    const {
      canvasProps, className, missingValueMessage, input,
    } = this.props

    const classes = classNames('signature', className)

    return (
      <>
        {!!missingValueMessage && (
        <div
          tabIndex='0'
          name={input.name} // used for selecting the element to scroll on error
          onClick={this.showCanvas}
          onFocus={this.showCanvas}
        >
          <WarningLabel warning={missingValueMessage} />
        </div>
        )}
        {!missingValueMessage && (
        <div className={classes}>
          <SignatureCanvas
            canvasProps={{
              tabIndex: 0,
              ...canvasProps,
            }}
            clearOnResize={false}
            onEnd={this.onEnd}
            penColor='black'
            ref={this.signatureRef}
          />
          <i
            className='declaration-signature-clear fa fa-eraser'
            onClick={this.onClear}
          />
        </div>
        )}
      </>
    )
  }
}

export default withMissingInputValueMessage(Signature)
