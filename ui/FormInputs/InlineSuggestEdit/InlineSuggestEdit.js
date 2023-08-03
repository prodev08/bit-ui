import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isUndefined from 'lodash/isUndefined'

import Suggest from 'ui/FormInputs/Suggest'

class InlineSuggestEdit extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    value: '',
  }

  state = {
    isEditing: false,
  }

  suggestRef = React.createRef()

  onItemSelect = (value) => {
    const { onChange } = this.props
    onChange(value)

    document.removeEventListener('mousedown', this.onMouseDown)
    this.setState({ isEditing: false })
  }

  toggleEdit = (isEditing) => {
    const { disabled } = this.props
    if (disabled) {
      return
    }

    if (_isUndefined(isEditing)) {
      this.setState(({ isEditing }) => ({ isEditing: !isEditing }))
    } else {
      this.setState({ isEditing })
    }
  }

  onBlur = (e) => {
    e.preventDefault()
  }

  onFocus = () => {
    document.addEventListener('mousedown', this.onMouseDown)
  }

  onMouseDown = (e) => {
    const { target } = e
    if (this.suggestRef && this.suggestRef.current && !this.suggestRef.current.contains(target)) {
      this.setState({ isEditing: false })
      document.removeEventListener('mousedown', this.onMouseDown)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown)
  }

  render() {
    const { isEditing } = this.state
    const { disabled, items, value } = this.props

    const textClasses = classNames('inline-suggest-edit-text', { clickable: !disabled })

    return (
      <div className='inline-suggest-edit' ref={this.suggestRef}>
        {isEditing && (
          <Suggest
            autoFocus
            inputProps={{
              className: 'inline-suggest-edit-input',
              onBlur: this.onBlur,
              onFocus: this.onFocus,
            }}
            items={items}
            onItemSelect={this.onItemSelect}
            value=''
          />
        )}
        {!isEditing && (
          <div className={textClasses} onClick={this.toggleEdit}>
            {value}
          </div>
        )}
      </div>
    )
  }
}

export default InlineSuggestEdit
