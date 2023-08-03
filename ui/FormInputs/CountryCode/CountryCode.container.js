import { connect } from 'react-redux'
import { change } from 'redux-form'
import CountryCode from './CountryCode'

const mapDispatchToProps = {
  changePhoneCountryIso: (form, value) => change(form, 'phone_country_iso', value),
}

export default connect(null, mapDispatchToProps)(CountryCode)
