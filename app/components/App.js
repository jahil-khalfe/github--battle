import React, { Component } from 'react'
import Popular from './Popular'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Nav/>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route exact path="/battle" component={Battle}/>
						<Route path="/battle/results" component={Results}/>
						<Route exact path="/popular" component={Popular}/>
						<Route render={() => {
							return(
								<h1>404 Whoopsie!!!</h1>
							)
						}} />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App