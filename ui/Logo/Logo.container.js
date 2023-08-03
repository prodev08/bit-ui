import { connect } from 'react-redux'

import { getTheme } from 'store/selectors'

import Logo from './Logo'

const mapStateToProps = (state) => ({
  theme: getTheme(state),
})

export default connect(mapStateToProps)(Logo)
