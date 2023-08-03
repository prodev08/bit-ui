import React from 'react'
import PropTypes from 'prop-types'

import Suggest from 'ui/FormInputs/Suggest'
import FILTER_TYPES from 'ui/FilterOptionsMenu/var/filterTypes'

import ObjectKeysFilterItem from './ObjectKeysFilterItem'

class ObjectKeysFilter extends React.PureComponent {
  static propTypes = {
    autocompleteKeys: PropTypes.array,
    items: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string,
    })).isRequired,
    limit: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    autocompleteKeys: [],
    limit: null,
  }

  state = {
    inputValue: '',
  }

  inputRef = React.createRef()

  addObjectKey = (value) => {
    const { inputValue } = this.state
    const { items, onChange } = this.props

    const key = value || inputValue
    if (!key || items.find((item) => item.key === key)) {
      return
    }

    onChange([
      ...items,
      {
        filterType: FILTER_TYPES.CONTAINS,
        key,
        value: '',
      },
    ])
    this.setState({ inputValue: '' })
  }

  onInputChange = (inputValue) => {
    this.setState({ inputValue })
  }

  onRemove = (index) => {
    const { items, onChange } = this.props

    onChange(items.filter((_, i) => i !== index))
  }

  onUpdate = (index, data) => {
    const { items, onChange } = this.props

    onChange(items.map((item, i) => (i === index ? { ...item, ...data } : item)))
  }

  render() {
    const { inputValue } = this.state
    const { autocompleteKeys, items, limit } = this.props

    return (
      <div className='object-keys-filter'>
        {items.map((item, index) => (
          <ObjectKeysFilterItem
            key={item.key}
            keyInputRef={this.inputRef}
            onUpdate={(data) => this.onUpdate(index, data)}
            onRemove={() => this.onRemove(index)}
            data={item}
          />
        ))}

        {(!limit || items.length < limit) && (
          <Suggest
            autoFocus
            className='object-keys-filter-input'
            inputRef={this.inputRef}
            items={autocompleteKeys}
            onChange={this.onInputChange}
            onItemSelect={this.addObjectKey}
            openOnKeyDown
            value={inputValue}
          />
        )}
      </div>
    )
  }
}

export default ObjectKeysFilter
