import React from 'react'
import PropTypes from 'prop-types'
import { IconNames } from '@blueprintjs/icons'
import { Icon } from '@blueprintjs/core'

import InputField from 'ui/FormInputs/InputField'
import FilterOptionsMenu from 'ui/FilterOptionsMenu'

class ObjectKeysFilterItem extends React.PureComponent {
  static propTypes = {
    keyInputRef: PropTypes.object.isRequired,
    data: PropTypes.shape({
      filterType: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      value: PropTypes.string,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()

    const { data } = props
    const { value } = data

    this.state = {
      inputValue: value,
    }
  }

  onFilterTypeChange = (filterType) => {
    const { onUpdate } = this.props
    onUpdate({ filterType })
  }

  onValueChange = (e) => {
    const { value: inputValue } = e.target
    this.setState({ inputValue })
  }

  onValueUpdate = () => {
    const { inputValue } = this.state
    const { onUpdate } = this.props

    onUpdate({ value: inputValue })
  }

  onValueConfirm = () => {
    const { keyInputRef } = this.props

    this.onValueUpdate()
    if (keyInputRef && keyInputRef.current) {
      keyInputRef.current.focus()
    }
  }

  render() {
    const { inputValue } = this.state
    const { data, onRemove } = this.props
    const { filterType, key } = data

    return (
      <div className='object-keys-filter-item'>
        <div className='object-keys-filter-item-key'>{key}</div>
        <InputField
          autoFocus
          className='object-keys-filter-item-value'
          onChange={this.onValueChange}
          onEnterKey={this.onValueConfirm}
          onBlur={this.onValueUpdate}
          rightElement={(
            <FilterOptionsMenu
              value={filterType}
              onChange={this.onFilterTypeChange}
            />
          )}
          value={inputValue}
        />
        <Icon
          icon={IconNames.TRASH}
          className='object-keys-filter-item-remove'
          onClick={onRemove}
        />
      </div>
    )
  }
}

export default ObjectKeysFilterItem
