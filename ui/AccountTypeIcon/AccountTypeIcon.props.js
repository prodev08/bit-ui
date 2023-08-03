import PropTypes from 'prop-types'

export const propTypes = {
  accountType: PropTypes.string,
  className: PropTypes.string,
  isMainAccount: PropTypes.bool,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  accountType: '',
  className: '',
  isMainAccount: false,
}
