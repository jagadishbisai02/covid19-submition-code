import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './header.css'

class Header extends Component {
  state = {showMenu: false}

  toggleMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  closeMenu = () => this.setState({showMenu: false})

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match
    const homeClassName = path === '/' ? 'link-name heighlight' : 'link-name'
    const aboutClassName =
      path === '/about' ? 'link-name heighlight' : 'link-name'

    return (
      <>
        <nav className="navbar-header">
          <Link to="/" className="link">
            <h1 className="header">
              COVID19<span className="span-header">INDIA</span>
            </h1>
          </Link>
          <ul className="nav-list">
            <Link to="/" className="link">
              <li key="1">
                <button type="button" className={homeClassName}>
                  Home
                </button>
              </li>
            </Link>
            <Link to="/about" className="link">
              <li key="2">
                <button type="button" className={aboutClassName}>
                  About
                </button>
              </li>
            </Link>
          </ul>
          <button type="button" className="menu-btn" onClick={this.toggleMenu}>
            <img
              src="https://res.cloudinary.com/df5wssoz1/image/upload/v1696768134/samples/Covid19/add-to-queue_1_khw6lw.png"
              alt="menu item"
              className="menu"
            />
          </button>
        </nav>
        {showMenu ? (
          <div className="menu-container">
            <ul className="menu-list">
              <Link to="/" className="link">
                <li key="1">
                  <button type="button" className={homeClassName}>
                    Home
                  </button>
                </li>
              </Link>
              <Link to="/about" className="link">
                <li key="2">
                  <button type="button" className={aboutClassName}>
                    About
                  </button>
                </li>
              </Link>
            </ul>
            <div>
              <button
                type="button"
                className="close-btn"
                onClick={this.closeMenu}
              >
                <img
                  src="https://res.cloudinary.com/df5wssoz1/image/upload/v1696768911/samples/Covid19/Solid_ozrayl.png"
                  alt="close"
                />
              </button>
            </div>
          </div>
        ) : null}
      </>
    )
  }
}
export default withRouter(Header)
