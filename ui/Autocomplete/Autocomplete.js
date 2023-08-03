import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Label from 'ui/FormInputs/Label'

// keys
const KEY_UP = 38
const KEY_DOWN = 40
const KEY_ENTER = 13
const KEY_ESCAPE = 27

const MAX_OPTIONS = 5

const getOptionText = (option) => {
  const { structured_formatting: { main_text, secondary_text } } = option
  return `${main_text} ${secondary_text}`
}

class Autocomplete extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    inputClass: PropTypes.string,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onOptionPick: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    disabled: false,
    inputClass: '',
    label: '',
    onBlur: () => { },
    onChange: () => { },
    onFocus: () => { },
    onKeyDown: () => { },
    onOptionPick: () => { },
    options: [],
    placeholder: '',
    value: '',
  }

  state = {
    isActive: false,
    selection: 0,
  }

  inputRef = React.createRef()

  blur = () => {
    const { current } = this.inputRef
    current.blur()
  }

  onKeyDown = (event) => {
    const { selection } = this.state
    const { onKeyDown, options } = this.props

    switch (event.keyCode) {
      case KEY_ESCAPE:
        event.preventDefault()
        this.blur()
        break
      case KEY_UP:
        event.preventDefault()
        this.setState({ selection: (options.length + selection) % (options.length + 1) })
        break
      case KEY_DOWN:
        event.preventDefault()
        this.setState({ selection: (selection + 1) % (options.length + 1) })
        break
      case KEY_ENTER:
        event.preventDefault()
        this.onOptionPick()
        break
      default:
    }
    onKeyDown()
  }

  onBlur = () => {
    const { onBlur } = this.props
    this.setState({ isActive: false })
    onBlur()
  }

  onChange = (e) => {
    const { onChange } = this.props
    const { value } = e.target

    this.setState({ selection: 0 })
    onChange(value)
  }

  onFocus = () => {
    const { onFocus } = this.props
    this.setState({ isActive: true })
    onFocus()
  }

  onOptionClick = (index) => {
    const { onChange, options } = this.props
    const option = options[index]
    const { place_id } = option
    onChange(getOptionText(option))
    this.onOptionPick(place_id)
  }

  onOptionPick = (place) => {
    const { selection } = this.state
    const { onOptionPick, options } = this.props
    const placeId = place || (selection && options[selection - 1].place_id)
    onOptionPick(placeId)
    this.blur()
  }

  render() {
    const { isActive, selection } = this.state
    const {
      disabled,
      className,
      inputClass,
      label,
      options,
      placeholder,
      value,
    } = this.props

    const classes = classNames('autocomplete', className)
    const inputClasses = classNames('autocomplete-input', inputClass)

    return (
      <div className={classes}>
        {label && <Label value={label} active={isActive || !!value} />}
        <input
          autoComplete='disable-autocomplete'
          className={inputClasses}
          disabled={disabled}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          placeholder={placeholder}
          ref={this.inputRef}
          type='text'
          value={selection === 0 ? value : getOptionText(options[selection - 1])}
        />
        {options.length > 0 && isActive && value && (
          <div className='autocomplete-popup'>
            {options.slice(0, MAX_OPTIONS).map((option, index) => {
              const { id, structured_formatting } = option
              const { main_text, secondary_text } = structured_formatting

              const optionClasses = classNames('autocomplete-popup-option', { active: index + 1 === selection })

              return (
                <div
                  className={optionClasses}
                  key={id}
                  onMouseDown={() => this.onOptionClick(index)}
                >
                  <span className='autocomplete-popup-option-main-text'>{main_text}</span>
                  <span className='autocomplete-popup-option-secondary-text'>{secondary_text}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

export default Autocomplete
