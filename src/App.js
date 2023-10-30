import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/home'
import StateRoute from './components/StateRoute/stateRoute'
import About from './components/About/about'
import NotFound from './components/NotFound/notFound'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/state/:stateCode" component={StateRoute} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
export default App
