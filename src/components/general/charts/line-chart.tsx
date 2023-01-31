import { Skeleton } from '@app/components/placeholders/skeleton'
import { Analytic, Website } from '@app/types'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
  VictoryScatter,
  VictoryVoronoiContainer,
} from 'victory'
import { useLineChart } from './use-chart'

interface LineChartProps {
  title?: string // page title
  data?: Analytic[] | Website[]
}

// web safe colors for charts
const RED_COLOR = '#7c270b'
const RED_FILL_COLOR = 'rgb(220 38 38)'
const RED_STROKE_COLOR = 'rgb(248 113 113)'
const YELLOW_COLOR = 'rgb(234 179 8)'
const YELLOW_FILL_COLOR = 'rgb(250 204 21)'
const YELLOW_STROKE_COLOR = 'rgb(253 224 71)'

// chart styles
const styles = {
  title: {
    textAnchor: 'start',
    verticalAnchor: 'end',
  },
  labelNumber: {
    textAnchor: 'middle',
    fontFamily: 'inherit',
    fontSize: '6px',
  },
  axisOne: {
    axis: { stroke: RED_COLOR, strokeWidth: 0 },
    ticks: { strokeWidth: 0 },
    tickLabels: {
      fontFamily: 'inherit',
      fontSize: 6.5,
    },
  },
  labelOne: {
    fill: RED_COLOR,
    fontFamily: 'inherit',
    fontSize: 7,
    fontStyle: 'italic',
  },
  lineOne: {
    data: { stroke: RED_COLOR, strokeWidth: 0.8 },
  },
  lineOneScatter: {
    data: { stroke: RED_STROKE_COLOR, strokeWidth: 0.8, fill: RED_FILL_COLOR },
  },
  axisTwo: {
    axis: { stroke: YELLOW_COLOR, strokeWidth: 0 },
    tickLabels: {
      fontFamily: 'inherit',
      fontSize: 6.5,
    },
  },
  labelTwo: {
    textAnchor: 'end',
    fill: YELLOW_COLOR,
    fontFamily: 'inherit',
    fontSize: 7,
    fontStyle: 'italic',
  },
  lineTwo: {
    data: { stroke: YELLOW_COLOR, strokeWidth: 0.8 },
  },
  lineTwoScatter: {
    data: {
      stroke: YELLOW_STROKE_COLOR,
      strokeWidth: 0.8,
      fill: YELLOW_FILL_COLOR,
    },
  },
}

// error line chart for warnings, errors
export const LineChart = ({ title, data }: LineChartProps) => {
  const {
    first,
    second,
    ticks,
    highestError,
    highestWarning,
    totalErrors,
    totalWarnings,
    determinedType,
  } = useLineChart({ data })

  // display empty loading state
  if (!data) {
    return (
      <div className='h-full w-full flex flex-1'>
        <Skeleton className='h-full w-full min-h-[30vh]' />
      </div>
    )
  }

  const headingText = `${totalErrors} error${
    totalErrors === 1 ? '' : 's'
  } and ${totalWarnings} warning${totalWarnings === 1 ? '' : 's'} across ${
    ticks.length
  } ${determinedType || 'page'}${ticks.length === 1 ? '' : 's'}`

  // render website chart
  if (determinedType === 'website') {
    return (
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => datum.l}
            labelComponent={
              <VictoryTooltip constrainToVisibleArea style={{ fontSize: 7 }} />
            }
          />
        }
      >
        <VictoryLabel
          x={12}
          y={18}
          className={'fill-gray-700 font-bold dark:fill-gray-200'}
          disableInlineStyles
          text={title ?? 'Website Analytics'}
        />
        <VictoryLabel
          x={12}
          y={33.5}
          className={'fill-gray-600 text-sm dark:fill-gray-100'}
          style={{ fontSize: 10, fill: '#525252' }}
          text={headingText}
        />

        <VictoryLabel
          x={420}
          y={20}
          style={styles.labelNumber}
          className={'fill-gray-700 font-semibold dark:fill-white'}
          text={`${ticks.length} websites`}
        />
        <VictoryLabel x={12} y={50} style={styles.labelOne} text={'Errors'} />
        <VictoryLabel
          x={438}
          y={50}
          style={styles.labelTwo}
          text={'Warnings'}
        />
        <VictoryAxis
          dependentAxis
          orientation='left'
          standalone={false}
          domain={[0, highestError]}
          style={styles.axisOne}
        />
        <VictoryAxis
          dependentAxis
          orientation='right'
          domain={[0, highestWarning]}
          standalone={false}
          style={styles.axisTwo}
        />
        <VictoryScatter data={first} style={styles.lineOneScatter} />
        <VictoryScatter data={second} style={styles.lineTwoScatter} />
      </VictoryChart>
    )
  }

  return (
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => datum.l}
          labelComponent={
            <VictoryTooltip constrainToVisibleArea style={{ fontSize: 7 }} />
          }
        />
      }
    >
      <svg className='box-border w-full' viewBox='0 0 450 350'>
        <rect
          x='0'
          y='0'
          width='10'
          height='30'
          className={
            totalErrors > totalWarnings ? 'fill-red-600' : 'fill-blue-600'
          }
        />
        <rect
          x='430'
          y='10'
          width='20'
          height='20'
          className='fill-gray-100 rounded'
        />

        <VictoryLabel
          x={25}
          y={24}
          style={styles.title}
          className={'fill-gray-700 font-semibold dark:fill-gray-200'}
          text={title ?? 'Website Analytics'}
        />
        <VictoryLabel
          x={25}
          y={33.5}
          className={'fill-gray-600 text-sm dark:fill-gray-100'}
          style={{ fontSize: 10, fill: '#525252' }}
          text={headingText}
        />

        <VictoryLabel
          x={440}
          y={20}
          style={styles.labelNumber}
          text={`${ticks.length}p`}
        />
        <VictoryLabel
          x={25}
          y={55}
          style={styles.labelOne}
          text={'Errors across pages'}
        />
        <VictoryLabel
          x={425}
          y={55}
          style={styles.labelTwo}
          text={'Warnings'}
        />
        <g transform={'translate(0, 33)'}>
          <VictoryAxis
            dependentAxis
            offsetX={20}
            orientation='left'
            standalone={false}
            domain={[0, highestError]}
            style={styles.axisOne}
          />
          <VictoryAxis
            dependentAxis
            offsetX={20}
            orientation='right'
            domain={[0, highestWarning]}
            standalone={false}
            style={styles.axisTwo}
          />
          <VictoryLine
            data={first}
            standalone={false}
            padding={20}
            style={styles.lineOne}
          />
          <VictoryLine
            data={second}
            standalone={false}
            style={styles.lineTwo}
            padding={20}
          />
        </g>
      </svg>
    </VictoryChart>
  )
}
