import PropTypes from 'prop-types'

export const propTypes = {
  alwaysShowError: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    initial: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    submitFailed: PropTypes.bool,
  }),
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  isTranslationDisabled: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      isTranslationDisabled: PropTypes.bool,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }),
  ).isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  showLabel: PropTypes.bool,
  selectedItemExcluded: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  missingValueMessage: PropTypes.string,
  placeholder: PropTypes.string,
  minimal: PropTypes.bool,
  usePortal: PropTypes.bool,
  filterable: PropTypes.bool,
  rightElement: PropTypes.node,
  onEnterKey: PropTypes.func,
  submitOnEnterKey: PropTypes.bool,
}

export const defaultProps = {
  alwaysShowError: false,
  input: {
    onFocus: () => { },
    onBlur: () => { },
  },
  isTranslationDisabled: false,
  items: [],
  label: '',
  meta: {},
  name: '',
  onChange: () => { },
  showLabel: true,
  selectedItemExcluded: false,
  value: '',
  disabled: false,
  missingValueMessage: undefined,
  placeholder: '',
  minimal: false,
  usePortal: false,
  filterable: false,
  rightElement: undefined,
  onEnterKey: undefined,
  submitOnEnterKey: false,
}
