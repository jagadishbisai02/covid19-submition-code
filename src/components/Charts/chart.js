import {Component} from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  LineChart,
  Line,
  YAxis,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './chart.css'

class Charts extends Component {
  state = {chartsList: '', chartsOther: '', isLoading: true}

  componentDidMount() {
    this.chartsData()
  }

  chartsData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const {districtCode} = this.props
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const dataObject = Object.keys(data[districtCode].dates)
      const dataState = dataObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        deceased: data[districtCode].dates[eachDate].total.deceased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.recovered -
            data[districtCode].dates[eachDate].total.deceased),
      }))

      const dataCharts = dataObject.map(eachDate => ({
        eachDate,
        confirmed: data[districtCode].dates[eachDate].total.confirmed,
        recovered: data[districtCode].dates[eachDate].total.recovered,
        deceased: data[districtCode].dates[eachDate].total.deceased,
        tested: data[districtCode].dates[eachDate].total.tested,
        active:
          data[districtCode].dates[eachDate].total.confirmed -
          (data[districtCode].dates[eachDate].total.recovered -
            data[districtCode].dates[eachDate].total.deceased),
      }))
      this.setState({
        chartsList: dataState,
        chartsOther: dataCharts,
        isLoading: false,
      })
    }
  }

  graphList = (caseList, color) => {
    const {chartsOther} = this.state

    return (
      <div className="line-chart-container" testid="lineChartsContainer">
        <LineChart
          width={500}
          height={250}
          data={chartsOther}
          margin={{top: 5, right: 50, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="eachDate"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={5}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={caseList} stroke={color} />
        </LineChart>
      </div>
    )
  }

  graphCharts = () => (
    <div className="charts-graphs-container">
      <h1 className="Charts-graph-heading">Daily Spread Trends</h1>
      <div className="line-chart-graph">
        <div className="charts-graph-list-margin confirmed-graph-background">
          {this.graphList('confirmed', '#ff073a')}
        </div>
        <div className="charts-graph-list-margin active-graph-background">
          {this.graphList('active', '#007BFF')}
        </div>
        <div className="charts-graph-list-margin recovered-graph-background">
          {this.graphList('recovered', '#27A243')}
        </div>
        <div className="charts-graph-list-margin deceased-graph-background">
          {this.graphList('deceased', '#6C757D')}
        </div>
        <div className="charts-graph-list-margin tested-graph-background">
          {this.graphList('tested', '#9673B9')}
        </div>
      </div>
    </div>
  )

  render() {
    const {chartsList, isLoading} = this.state
    const {districtsChart} = this.props

    const barChart = districtsChart.toLowerCase()
    const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))
    let barColor = '#9A0E31'
    if (barChart === 'confirmed') {
      barColor = '#9A0E31'
    } else if (barChart === 'active') {
      barColor = '#007BFF'
    } else if (barChart === 'recovered') {
      barColor = '#28A745'
    } else if (barChart === 'deceased') {
      barColor = '#6C757D'
    }
    return (
      <>
        {isLoading ? (
          <div className="page-loader" testid="timeLinesDataLoader">
            <Loader type="Oval" color="#007bff" height={50} width={50} />
          </div>
        ) : (
          <div className="chart-container">
            <div className="charts-barChart">
              <BarChart
                width={600}
                height={331}
                barSize={35}
                data={maxBarChart}
                margin={{top: 5, right: 20, left: 20, bottom: 5}}
              >
                <XAxis
                  dataKey="eachDate"
                  stroke={`${barColor}`}
                  interval={0}
                  axisLine={false}
                  fontSize={10}
                  tickLine={0}
                  strokeWidth={1}
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                  dy={5}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={barChart}
                  fill={`${barColor}`}
                  label={{position: 'top', fill: `${barColor}`, fontSize: 10}}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </div>
            <div className="charts-bargraph">{this.graphCharts()}</div>
          </div>
        )}
      </>
    )
  }
}

export default Charts
