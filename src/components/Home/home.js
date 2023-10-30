import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ListOfState from '../StateList/stateList'
import Footer from '../Footer'
import SearchState from '../SearchStates/searchState'
import './home.css'

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

class Home extends Component {
  state = {
    totalActive: 0,
    totalConfirmed: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    searchInput: '',
    isLoading: true,
    searchList: [],
    listOfCovidStateData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      let activeCase = 0
      let confirmCase = 0
      let recoveredCase = 0
      let deceasedCase = 0

      statesList.forEach(stateCode => {
        if (data[stateCode.state_code]) {
          const {total} = data[stateCode.state_code]
          confirmCase += total.confirmed ? total.confirmed : 0
          recoveredCase += total.recovered ? total.recovered : 0
          deceasedCase += total.deceased ? total.deceased : 0
        }
      })
      activeCase += confirmCase - (recoveredCase + deceasedCase)
      const listOfCovidTableState = statesList.map(eachItem => ({
        stateName: eachItem.state_name,
        stateCode: eachItem.state_code,
        listOfConfirmed: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.confirmed),
        listOfRecovered: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.recovered),
        listOfDeceased: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.deceased),
        listOfOther: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.other),
        listOfPopulation: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].meta.population),
      }))
      this.setState({
        totalConfirmed: confirmCase,
        totalRecovered: recoveredCase,
        totalDeceased: deceasedCase,
        totalActive: activeCase,
        isLoading: false,
        listOfCovidStateData: listOfCovidTableState,
      })
    }
  }

  searchInputList = event => {
    const search = event.target.value
    const searchLists = statesList.filter(each =>
      each.state_name.toLowerCase().includes(search.toLowerCase()),
    )

    return this.setState({
      searchList: searchLists,
      searchInput: event.target.value,
    })
  }

  ascSort = () => {
    const {listOfCovidStateData} = this.state
    const sort = listOfCovidStateData.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a > b ? 1 : -1
    })
    this.setState({listOfCovidStateData: sort})
  }

  descSort = () => {
    const {listOfCovidStateData} = this.state
    const sort = listOfCovidStateData.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a < b ? 1 : -1
    })
    this.setState({listOfCovidStateData: sort})
  }

  listOfSearch = () => {
    const {searchList} = this.state
    return (
      <ul testid="searchResultsUnorderedList" className="search-state-lists">
        {searchList.map(each => (
          <SearchState
            stateName={each.state_name}
            stateCode={each.state_code}
            key={each.state_code}
            id={each.state_code}
          />
        ))}
      </ul>
    )
  }

  listOfStateTable = () => {
    const {listOfCovidStateData} = this.state

    return (
      <div
        className="state-table-container-home-page"
        testid="stateWiseCovidDataTable"
      >
        <div className="state-table">
          <ul className="table-heading">
            <li className="state-sorted">
              <p className="heading">States/UT</p>
              <button
                type="button"
                data-testid="ascendingSort"
                className="sorting-btn"
                onClick={this.ascSort}
              >
                <FcGenericSortingAsc />
              </button>
              <button
                type="button"
                data-testid="descendingSort"
                className="sorting-btn"
                onClick={this.descSort}
              >
                <FcGenericSortingDesc />
              </button>
            </li>
            <li className="heading">Confirmed</li>
            <li className="heading">Active</li>
            <li className="heading">Recovered</li>
            <li className="heading">Deceased</li>
            <li className="heading">Population</li>
          </ul>
          <hr className="horizontal-line" />
          <ul className="state-result-data">
            {listOfCovidStateData.map(each => (
              <ListOfState key={each.stateCode} stateList={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  covidCards = () => {
    const {
      totalActive,
      totalConfirmed,
      totalRecovered,
      totalDeceased,
    } = this.state

    return (
      <>
        <div className="card-container">
          <ul
            className="country-wide-confirmed-cases"
            testid="countryWideConfirmedCases"
          >
            <li>
              <p className="title">Confirmed</p>
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/df5wssoz1/image/upload/v1696820101/samples/Covid19/check-mark_1_r4m79y.png"
                alt="country wide confirmed cases pic"
              />
            </li>
            <li>
              <p className="counter">{totalConfirmed}</p>
            </li>
          </ul>
          <ul
            className="country-wide-active-cases"
            testid="countryWideActiveCases"
          >
            <li>
              <p className="title">Active</p>
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/df5wssoz1/image/upload/v1696820101/samples/Covid19/protection_1_vzyvni.png"
                alt="country wide active cases pic"
              />
            </li>
            <li>
              <p className="counter">{totalActive}</p>
            </li>
          </ul>
          <ul
            className="country-wide-recovered-cases"
            testid="countryWideRecoveredCases"
          >
            <li>
              <p className="title">Recovered</p>
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/df5wssoz1/image/upload/v1696820101/samples/Covid19/recovered_1_jg6qzy.png"
                alt="country wide recovered cases pic"
              />
            </li>
            <li>
              <p className="counter">{totalRecovered}</p>
            </li>
          </ul>
          <ul
            className="country-wide-deceased-cases"
            testid="countryWideDeceasedCases"
          >
            <li>
              <p className="title">Deceased</p>
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/df5wssoz1/image/upload/v1696820101/samples/Covid19/breathing_1_g6ixah.png"
                alt="country wide deceased cases pic"
              />
            </li>
            <li>
              <p>{totalDeceased}</p>
            </li>
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading, searchList, searchInput} = this.state
    const searchResult = searchList.length === 0 ? '' : this.listOfSearch()
    return (
      <>
        <div className="home-container">
          <Header />
          {isLoading ? (
            <div className="page-loader" testid="homeRouteLoader">
              <Loader type="Oval" color="#007bff" height={50} width={50} />
            </div>
          ) : (
            <>
              <div className="home-content-container">
                <div className="home-search">
                  <div className="search-input-container">
                    <BsSearch size={20} color="#94A3B8" />
                    <input
                      type="search"
                      placeholder="Enter the State"
                      className="search-input"
                      onChange={this.searchInputList}
                    />
                  </div>
                  {searchInput.length > 0 ? searchResult : ''}
                </div>
                {this.covidCards()}
                {this.listOfStateTable()}
              </div>
            </>
          )}
          <Footer />
        </div>
      </>
    )
  }
}
export default Home
