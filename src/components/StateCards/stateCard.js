import {Component} from 'react'
import './stateCard.css'

class StateCards extends Component {
  state = {
    confirmedCard: {},
    recoveredCard: {},
    deceasedCard: {},
    activeCard: {},
  }

  componentDidMount() {
    this.totalDistrict()
  }

  totalDistrict = async () => {
    const {totalStateCards} = this.props
    const districtConfirmed = totalStateCards.confirmed
    const districtRecovered = totalStateCards.recovered
    const districtDeceased = totalStateCards.deceased
    const districtActive =
      districtConfirmed - (districtRecovered + districtDeceased)

    const confirmedCard = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/df5wssoz1/image/upload/v1696820101/samples/Covid19/check-mark_1_r4m79y.png',
      value: districtConfirmed,
    }

    const recoveredCard = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/df5wssoz1/image/upload/v1696820101/samples/Covid19/recovered_1_jg6qzy.png',
      value: districtRecovered,
    }
    const deceasedCard = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/df5wssoz1/image/upload/v1696820101/samples/Covid19/breathing_1_g6ixah.png',
      value: districtDeceased,
    }
    const activeCard = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/df5wssoz1/image/upload/v1696820101/samples/Covid19/protection_1_vzyvni.png',
      value: districtActive,
    }

    this.setState({
      confirmedCard,
      recoveredCard,
      deceasedCard,
      activeCard,
    })
  }

  cardClick = value => {
    const {stateListCards} = this.props
    stateListCards(value)
  }

  render() {
    const {isStateCard} = this.props
    const {confirmedCard, recoveredCard, activeCard, deceasedCard} = this.state
    const isDistrictCard = isStateCard ? '' : 'background'

    return (
      <ul className="state-route-state-cards">
        <li
          className={`stateCard-background ${confirmedCard.name} ${isDistrictCard}`}
          tabIndex="-1"
          key={confirmedCard.name}
          value={confirmedCard.name}
          onClick={() => this.cardClick(confirmedCard.name)}
        >
          <div
            className="state-route-cards"
            testid="stateSpecificConfirmedCaseContainer"
          >
            <p className="title">{confirmedCard.name}</p>
            <img
              src={confirmedCard.logo}
              alt="state specific confirmed cases pic"
            />
            <p className="state-districts-values">{confirmedCard.value}</p>
          </div>
        </li>
        <li
          className={`stateCard-background ${activeCard.name} ${isDistrictCard}`}
          tabIndex="-1"
          key={activeCard.name}
          value={activeCard.name}
          onClick={() => this.cardClick(activeCard.name)}
        >
          <div
            className="state-route-cards"
            testid="stateSpecificActiveCaseContainer"
          >
            <p className="title">{activeCard.name}</p>
            <img src={activeCard.logo} alt="state specific active cases pic" />
            <p className="state-districts-values">{activeCard.value}</p>
          </div>
        </li>
        <li
          className={`stateCard-background ${recoveredCard.name} ${isDistrictCard}`}
          tabIndex="-1"
          key={recoveredCard.name}
          value={recoveredCard.name}
          onClick={() => this.cardClick(recoveredCard.name)}
        >
          <div
            className="state-route-cards"
            testid="stateSpecificRecoveredCaseContainer"
          >
            <p className="title">{recoveredCard.name}</p>
            <img
              src={recoveredCard.logo}
              alt="state specific recovered cases pic"
            />
            <p className="state-districts-values">{recoveredCard.value}</p>
          </div>
        </li>
        <li
          className={`stateCard-background ${deceasedCard.name} ${isDistrictCard}`}
          tabIndex="-1"
          key={deceasedCard.name}
          value={deceasedCard.name}
          onClick={() => this.cardClick(deceasedCard.name)}
        >
          <div
            className="state-route-cards"
            testid="stateSpecificDeceasedCaseContainer"
          >
            <p className="title">{deceasedCard.name}</p>
            <img
              src={deceasedCard.logo}
              alt="state specific deceased cases pic"
            />
            <p className="state-districts-values">{deceasedCard.value}</p>
          </div>
        </li>
      </ul>
    )
  }
}

export default StateCards
