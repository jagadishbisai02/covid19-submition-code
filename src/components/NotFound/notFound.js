import {Link} from 'react-router-dom'
import './notFound.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/df5wssoz1/image/upload/v1698556761/samples/Covid19/Vector_ariond.png"
      alt="not-found-pic"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found
    </p>
    <button type="button" className="home-btn">
      <Link to="/state/:stateCode" className="link-btn">
        Home
      </Link>
    </button>
  </div>
)
export default NotFound
