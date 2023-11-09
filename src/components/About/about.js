import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './about.css'

class About extends Component {
  state = {aboutDetails: [], isLoading: true}

  componentDidMount() {
    this.getAboutDetails()
  }

  getAboutDetails = async () => {
    const ApiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(ApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const aboutData = data.faq.map(each => ({
        question: each.question,
        answer: each.answer,
        id: each.qno,
      }))

      this.setState({
        aboutDetails: aboutData,
        isLoading: false,
      })
    }
  }

  render() {
    const {aboutDetails, isLoading} = this.state
    return (
      <div className="about-page">
        <Header />
        {isLoading ? (
          <div className="page-loader" testid="aboutRouteLoader">
            <Loader type="Oval" color="#007bff" height={50} width={50} />
          </div>
        ) : (
          <div className="about-container">
            <h1 className="about-header">About</h1>
            <p className="updated-date">Last update on march 28th 2021.</p>
            <p className="description">
              COVID-19 vaccines be ready for distribution
            </p>
            <ul className="about-page-unorder-page" testid="faqsUnorderedList">
              {aboutDetails.map(eachItem => (
                <li key={eachItem.id}>
                  <p className="question">{eachItem.question}</p>
                  <p className="answer">{eachItem.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Footer />
      </div>
    )
  }
}

export default About
