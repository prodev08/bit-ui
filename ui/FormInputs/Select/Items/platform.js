import disabledOption from 'ui/FormInputs/Select/Items/disabledOption'
import { PLATFORMS } from 'config'

const platformItems = [
  { value: '', label: 'platform' },
  disabledOption,
  { value: 'bitfinex_tr', label: PLATFORMS.BFX_TR, trans: false },
  { value: 'bitfinex_jp', label: PLATFORMS.BFX_JP, trans: false },
  { value: 'bitfinex_br', label: PLATFORMS.BFX_BR, trans: false },
  { value: PLATFORMS.BITFINEX, label: PLATFORMS.BITFINEX, trans: false },
  { value: PLATFORMS.EOSFINEX, label: PLATFORMS.EOSFINEX, trans: false },
]

export default platformItems
