import { NET_WORTH_USD } from 'var/forms/netWorthUSD'

const netWorthItems = NET_WORTH_USD.map((worth, i) => ({
  value: i.toString(),
  label: worth,
  trans: false,
}))

export default netWorthItems
