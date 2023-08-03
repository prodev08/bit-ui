import React from 'react'

import Select from 'ui/FormInputs/Select'

import ProductPriceRangeSelectItems from './ProductPriceRangeSelect.items'

const ProductPriceRangeSelect = (props) => (
  <Select
    isTranslationDisabled
    items={ProductPriceRangeSelectItems}
    {...props}
  />
)

export default ProductPriceRangeSelect
