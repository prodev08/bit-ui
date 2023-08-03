import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { getAdminsEmails } from 'store/selectors/admins.selectors'
import { getAdminUsername } from 'store/selectors/auth.selectors'

import AdminUsernameSelector from './AdminUsernameSelector'

const mapStateToProps = (state) => ({
  admins: getAdminsEmails(state),
  adminUsername: getAdminUsername(state),
})

export default connect(mapStateToProps)(withTranslation()(AdminUsernameSelector))
