import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import StateCards from '../StateCards/stateCard'
import TopDistricts from '../TopDistricts/topDistrict'
import './stateRoute.css'
import Charts from '../Charts/chart'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StateRoute extends Component {
  state = {
    isLoading: true,
    totalState: [],
    totalTested: 0,
    listStateName: '',
    stateCodes: '',
    stateDate: '',
    localStoredData: [],
    id: '',
    isStateCard: true,
    category: 'Confirmed',
  }

  componentDidMount() {
    this.districtData()
  }

  districtData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data[stateCode])
      if (data[stateCode] !== undefined) {
        const stateTested = data[stateCode].total.tested
        const isStateCode = statesList.filter(
          eachItem => eachItem.state_code === stateCode,
        )
        const totalStateData = data[stateCode].total
        const stateName = isStateCode[0].state_name
        const newDate = new Date(data[stateCode].meta.last_updated)
        this.setState({
          isLoading: false,
          totalState: totalStateData,
          listStateName: stateName,
          localStoredData: data,
          id: stateCode,
          totalTested: stateTested,
          stateDate: newDate,
          stateCodes: stateCode,
        })
      } else {
        console.log('undefined')
      }
    }
  }

  stateData = () => {
    const {id, localStoredData, category} = this.state
    const listOfDistrict = localStoredData[id].districts
    const listOfDistrictName = Object.keys(listOfDistrict)
    const lowerCaseDis = category.toLowerCase()
    const dataElement = listOfDistrictName.map(eachItem => ({
      districtNameList: eachItem,
      districtValue: listOfDistrict[eachItem].total[lowerCaseDis]
        ? listOfDistrict[eachItem].total[lowerCaseDis]
        : 0,
    }))

    dataElement.sort((a, b) => b.districtValue - a.districtValue)

    const stateActiveCase = listOfDistrictName.map(eachItem => ({
      districtNameList: eachItem,
      districtValue:
        listOfDistrict[eachItem].total.confirmed -
        (listOfDistrict[eachItem].total.recovered +
          listOfDistrict[eachItem].total.deceased)
          ? listOfDistrict[eachItem].total.confirmed -
            (listOfDistrict[eachItem].total.recovered +
              listOfDistrict[eachItem].total.deceased)
          : 0,
    }))
    stateActiveCase.sort((a, b) => b.districtValue - a.districtValue)

    if (lowerCaseDis === 'active') {
      return stateActiveCase
    }
    return dataElement
  }

  stateListCards = card => {
    this.setState({category: card, isStateCard: false})
  }

  districtName = () => {
    const {
      listStateName,
      totalTested,
      totalState,
      isStateCard,
      stateDate,
      category,
      stateCodes,
    } = this.state

    const topDistricts = this.stateData()

    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return (
      <div className="state-district-details">
        <div className="state-route-state-names">
          <div className="date-container">
            <div className="state-district-header-container">
              <h1 className="state-district-state-name">{listStateName}</h1>
            </div>
            <p className="district-state-date">{`Last update on ${
              months[stateDate.getMonth()]
            } ${stateDate.getDate()} ${stateDate.getFullYear()}`}</p>
          </div>
          <div className="total-tested">
            <p className="tested-name">Tested</p>
            <p className="tested-number">{totalTested}</p>
          </div>
        </div>

        <div className="state-route-state-card-container">
          <StateCards
            stateListCards={this.stateListCards}
            totalStateCards={totalState}
            isStateCard={isStateCard}
          />
        </div>
        <div className="top-state-district">
          <h1 className="top-district-header">Top Districts</h1>
          <ul
            className="top-districts-unordered-list"
            data-testid="topDistrictsUnorderedList"
          >
            {topDistricts.map(eachItem => (
              <TopDistricts
                topDistrictsNumber={eachItem.districtValue}
                topDistrictsName={eachItem.districtNameList}
                key={eachItem.districtNameList}
              />
            ))}
          </ul>
        </div>
        <div className="state-route-chart-container">
          <Charts districtsChart={category} districtCode={stateCodes} />
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="state-route-container">
        <Header />
        <div className="state-container-district">
          {isLoading ? (
            <div className="page-loader" data-testid="stateDetailsLoader">
              <Loader type="Oval" color="#007bff" height={50} width={50} />
            </div>
          ) : (
            this.districtName()
          )}
        </div>
        <Footer />
      </div>
    )
  }
}
export default StateRoute
