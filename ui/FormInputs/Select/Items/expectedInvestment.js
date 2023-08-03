import _map from 'lodash/map'
import { EXPECTED_INVESTMENT } from 'var/forms/expectedInvestment'

const expectedInvestmentItems = _map(EXPECTED_INVESTMENT, (investment, i) => ({
  value: (i === 0 ? i : i + 1).toString(),
  label: investment,
}))

export default expectedInvestmentItems
