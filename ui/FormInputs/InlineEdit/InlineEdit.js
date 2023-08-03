import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withMissingInputValueMessage from 'HOC/withMissingInputValueMessage'
import ErrorLabel from '../ErrorLabel'
import WarningLabel from '../WarningLabel'

const selectInputText = (element) => {
  element.setSelectionRange(0, element.value.length)
}

class InlineEdit extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    meta: PropTypes.shape({
      form: PropTypes.string.isRequired,
      submitFailed: PropTypes.bool.isRequired,
    }),
    missingValueMessage: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onChangeFilter: PropTypes.func,
    paramName: PropTypes.string.isRequired,
    setMissingValueMessageInvisible: PropTypes.func,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  static defaultProps = {
    className: '',
    inputClassName: '',
    meta: undefined,
    missingValueMessage: undefined,
    name: '',
    onChangeFilter: null,
    setMissingValueMessageInvisible: () => {},
  }

  constructor(props) {
    super()

    const { text } = props
    this.state = {
      editing: false,
      text,
    }
  }

  inputRef = React.createRef()

  componentDidUpdate(prevProps, prevState) {
    const { editing } = this.state
    const { text } = this.props

    if (editing && !prevState.editing) {
      const { current: inputElem } = this.inputRef
      inputElem.focus()
      selectInputText(inputElem)
    } else if (editing && prevProps.text !== text) {
      this.finishEditing()
    }
  }

  startEditing = (e) => {
    e.stopPropagation()
    const { setMissingValueMessageInvisible, text } = this.props
    this.setState({ editing: true, text })
    setMissingValueMessageInvisible()
  }

  finishEditing = () => {
    const { text } = this.state
    const { text: currentText } = this.props
    if (currentText !== text) {
      this.commitEditing()
    } else if (currentText === text) {
      this.cancelEditing()
    }
  }

  cancelEditing = () => {
    const { text } = this.props
    this.setState({ editing: false, text })
  }

  commitEditing = () => {
    const { text } = this.state
    const { paramName, onChange } = this.props

    this.setState({ editing: false, text })
    onChange({ [paramName]: text })
  }

  keyDown = (event) => {
    if (event.keyCode === 13) {
      this.finishEditing()
    } else if (event.keyCode === 27) {
      this.cancelEditing()
    }
  }

  textChanged = (event) => {
    const { onChangeFilter } = this.props

    if (onChangeFilter && !onChangeFilter(event)) {
      return false
    }

    this.setState({
      text: event.target.value,
    })
  }

  render() {
    const { text, editing } = this.state
    const {
      className, inputClassName, meta = { }, missingValueMessage, name,
    } = this.props
    const { error, submitFailed } = meta
    const shouldShowError = submitFailed && error

    if (editing) {
      return (
        <input
          name={name}
          onKeyDown={this.keyDown}
          onBlur={this.finishEditing}
          className={classNames('inline-edit-input', inputClassName)}
          value={text}
          onChange={this.textChanged}
          ref={this.inputRef}
        />
      )
    }

    return (
      <span
        className={classNames('inline-edit', className)}
        tabIndex='0'
        name={name} // used for selecting the element to scroll on error
        onClick={this.startEditing}
        onFocus={this.startEditing}
      >
        {shouldShowError && <ErrorLabel error={error} />}
        {!shouldShowError && missingValueMessage && <WarningLabel warning={missingValueMessage} />}
        {!shouldShowError && !missingValueMessage && text}
      </span>
    )
  }
}

export default withMissingInputValueMessage(InlineEdit)
