import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import DateInput from 'ui/FormInputs/DateInput'
import { getDate, formatStartDate, formatEndDate } from 'utils/dates'
import DATE_FORMATS from 'utils/dates/formats'

class DateInputs extends React.PureComponent {
  static propTypes = {
    defaultStartDate: PropTypes.number,
    defaultEndDate: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    shouldSetToDefaults: PropTypes.bool,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultStartDate: null,
    defaultEndDate: null,
    shouldSetToDefaults: false,
  }

  constructor(props) {
    super()

    const { defaultStartDate, defaultEndDate } = props

    const startDate = defaultStartDate && getDate(defaultStartDate)
    const endDate = defaultEndDate && getDate(defaultEndDate)

    this.state = {
      startDate: startDate && startDate.format(DATE_FORMATS.FULL_DATE),
      endDate: endDate && endDate.format(DATE_FORMATS.FULL_DATE),
      startDateExt: formatStartDate(startDate),
      endDateExt: formatEndDate(endDate),
    }
  }

  componentDidUpdate() {
    const { shouldSetToDefaults } = this.props
    if (shouldSetToDefaults) {
      this.resetToDefaultDates()
    }
  }

  resetToDefaultDates = () => {
    const { defaultStartDate, defaultEndDate } = this.props

    const startDate = defaultStartDate && getDate(defaultStartDate)
    const endDate = defaultEndDate && getDate(defaultEndDate)

    this.handleStartChange(startDate
      ? startDate.format(DATE_FORMATS.FULL_DATE)
      : null)
    this.handleEndChange(endDate
      ? endDate.format(DATE_FORMATS.FULL_DATE)
      : null)
  }

  handleStartChange = (startDate) => {
    const date = startDate ? getDate(startDate) : null
    this.setState({
      startDate: startDate || null,
      startDateExt: formatStartDate(date),
    }, this.onDateChange)
  }

  handleEndChange = (endDate) => {
    const date = endDate ? getDate(endDate) : null
    this.setState({
      endDate: endDate || null,
      endDateExt: formatEndDate(date),
    }, this.onDateChange)
  }

  onDateChange = () => {
    const { startDateExt, endDateExt } = this.state
    const { onChange } = this.props

    onChange(startDateExt, endDateExt)
  }

  render() {
    const { startDate, endDate } = this.state
    const { t } = this.props

    return (
      <div className='date-inputs'>
        <DateInput
          date={startDate}
          placeholder={t('start_date')}
          onChange={this.handleStartChange}
        />
        <DateInput
          date={endDate}
          placeholder={t('end_date')}
          onChange={this.handleEndChange}
        />
      </div>
    )
  }
}

export default withTranslation()(DateInputs)
