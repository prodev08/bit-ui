import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ReactShadowRoot from 'react-shadow-root'

import CHART_TYPES from './var/chartTypes'

const DEFAULT_COLOR = 'orange'

const styles = `
  .chart {
    width: 100%;
    height: 100%;
  }
  
  .recharts-wrapper {
    margin: 0 auto;
  }

  .recharts-default-legend {
    margin-left: 67px !important;
  }

  .recharts-legend-item {
    cursor: pointer;
  }

  .recharts-tooltip-wrapper {
    color: #000000;
  }
  
  .recharts-cursor {
    fill: white;
    opacity: 0.05;
  }

  .recharts-label {
    color: black;
  }

  .recharts-surface {
    margin-bottom: 3px;
  }

  .chart-no-data {
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
`

const Chart = ({
  className,
  data,
  dataKeys,
  hasData,
  t,
  tooltips,
  type,
}) => {
  const [hiddenKeys, setHiddenKeys] = useState({})

  const getCategories = () => {
    switch (type) {
      case CHART_TYPES.LINE:
        return dataKeys.map((key) => {
          const { dataKey = key, color = DEFAULT_COLOR, name } = key

          return (
            <Line
              key={dataKey}
              name={name}
              type='monotone'
              dataKey={dataKey}
              stroke={color}
              hide={hiddenKeys[dataKey]}
            />
          )
        })

      case CHART_TYPES.BAR:
      default:
        return dataKeys.map((key) => {
          const { dataKey = key, color = DEFAULT_COLOR, name } = key

          return (
            <Bar
              key={dataKey}
              name={name}
              dataKey={dataKey}
              stroke={color}
              fill={color}
              maxBarSize={70}
              hide={hiddenKeys[dataKey]}
            />
          )
        })
    }
  }

  const getChartContainer = () => {
    switch (type) {
      case CHART_TYPES.LINE:
        return LineChart
      case CHART_TYPES.BAR:
      default:
        return BarChart
    }
  }

  const onLegendClick = ({ dataKey }) => {
    setHiddenKeys({
      ...hiddenKeys,
      [dataKey]: !hiddenKeys[dataKey],
    })
  }

  if (!hasData) {
    return (
      <div className='chart-no-data'>
        {t('no_data_available')}
      </div>
    )
  }

  const classes = classNames('chart', className)
  const ChartContainer = getChartContainer()

  return (
    <div>
      <ReactShadowRoot>
        <style>{styles}</style>
        <div className={classes}>
          <ResponsiveContainer aspect={4.0 / 1.8} minWidth={300}>
            <ChartContainer data={data}>
              <XAxis dataKey='name' stroke='#9e9494' />
              <YAxis stroke='#9e9494' domain={[0, 'dataMax + 1']} />
              {tooltips && <Tooltip />}
              <CartesianGrid stroke='#57636b' strokeDasharray='4 4' />
              <Legend
                verticalAlign='top'
                wrapperStyle={{ paddingBottom: 15 }}
                iconType='rect'
                onClick={onLegendClick}
              />
              {getCategories()}
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </ReactShadowRoot>
    </div>
  )
}

Chart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  hasData: PropTypes.bool,
  t: PropTypes.func.isRequired,
  tooltips: PropTypes.bool,
  type: PropTypes.oneOf([
    CHART_TYPES.BAR,
    CHART_TYPES.LINE,
  ]),
}

Chart.defaultProps = {
  className: '',
  hasData: false,
  tooltips: false,
  type: CHART_TYPES.LINE,
}

export default memo(Chart)
