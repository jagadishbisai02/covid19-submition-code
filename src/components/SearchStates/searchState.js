import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './searchState.css'

const SearchState = props => {
  const {stateName, stateCode} = props

  return (
    <>
      <li className="search-state-container">
        <p className="search-state-names">{stateName}</p>
        <button type="button" className="state-name-btn">
          <Link to={`/state/${stateCode}`} className="link-state-code-search">
            {stateCode} <BiChevronRightSquare size={18} />
          </Link>
        </button>
      </li>
    </>
  )
}

export default SearchState
