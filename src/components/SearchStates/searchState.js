import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './searchState.css'

const SearchState = props => {
  const {stateName, stateCode} = props

  return (
    <>
      <li className="search-state-container">
        <p className="search-state-names">{stateName}</p>
        <Link to={`/state/${stateCode}`} className="link-state-code-search">
          <button type="button" className="state-name-btn">
            {stateCode} <BiChevronRightSquare size={18} />
          </button>
        </Link>
      </li>
    </>
  )
}

export default SearchState
