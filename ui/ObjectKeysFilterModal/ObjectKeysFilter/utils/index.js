import _isArray from 'lodash/isArray'
import _isEmpty from 'lodash/isEmpty'
import _isPlainObject from 'lodash/isObject'
import _forEach from 'lodash/forEach'
import _keys from 'lodash/keys'
import _uniq from 'lodash/uniq'

export const processNode = (node, result = [], keys = []) => {
  if (!_isPlainObject(node) && !_isArray(node)) {
    if (!_isEmpty(keys)) {
      return result.concat(keys.join('.'))
    }
    return result
  }

  if (_isArray(node)) {
    _forEach(node, (item) => processNode(item, result, keys))
    return result
  }

  _forEach(_keys(node), (key) => {
    processNode(node[key], result, [...keys, key])
  })

  return result
}

export const generateAutocompleteData = (object) => _uniq(processNode(object))
