// import { useState } from 'react'
import moment from 'moment'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Energy } from '../common/types'

export const EnergyBarChart = ({
  data,
  disableEOut = false,
}: EnergyBarChartProps) => {
  // const [xValues, setXValues] = useState<number[]>([])

  // const formatDate = (date: Date) => {
  //   if (xValues.includes(date.getMonth())) {
  //     setXValues([...xValues, date.getMonth()])
  //     return moment(date, 'YYYY-MM-DD HH:mm:ss').format('MMMM')
  //   }
  //   return ''
  // }

  if (!data) {
    return <div>Sorry,there seems to be no data available!</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="ts"
          axisLine={false}
          tickLine={false}
          xAxisId={0}
          tickFormatter={(tick) => moment(tick).format('MMM DD')}
          interval={3}
        />
        <XAxis
          dataKey="ts"
          axisLine={false}
          tickLine={false}
          xAxisId={1}
          tick={false}
          // tickFormatter={(date) => formatDate(new Date(date))}
        />
        <YAxis type="number" domain={[0, 70]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="ein" fill="#8884d8" name="Energy Generated" xAxisId={0} />
        {!disableEOut && (
          <Bar
            dataKey="eout"
            fill="#82ca9d"
            name="Energy Consumed"
            xAxisId={1}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  )
}

const CustomXTick = (tickValue: string) => {
  return (
    <g transform={`translate(1,2)`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {tickValue}
      </text>
    </g>
  )
}

// class CustomizedAxisTick extends PureComponent {
//   render() {
//     const { x, y, stroke, payload } = this.props

//     return (
//       <g transform={`translate(${x},${y})`}>
//         <text
//           x={0}
//           y={0}
//           dy={16}
//           textAnchor="end"
//           fill="#666"
//           transform="rotate(-35)"
//         >
//           {payload.value}
//         </text>
//       </g>
//     )
//   }
// }

type EnergyBarChartProps = {
  data: Energy[] | undefined
  disableEOut: boolean
}
