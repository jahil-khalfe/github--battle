import React, {Component} from 'react'
import PlayerInput from './PlayerInput'
import PlayerPreview from './PlayerPreview'

import {Link} from 'react-router-dom'

class Battle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleReset = this.handleReset.bind(this)
	}

	handleSubmit(id, username) {
		this.setState(() => {
			let newState = {}
			newState[id + 'Name'] = username;
			newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
			return newState
		})
	}

	handleReset(id) {
		this.setState(() => {
			let newState = {}
			newState[id + 'Name'] = '';
			newState[id + 'Image'] = null
			return newState
		})
	}

	render() {
		const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state
		const match = this.props.match
		return (
				<div>
					<div className="row">
						{
							!playerOneName &&
							<PlayerInput id='playerOne' label="Player One" onSubmit={this.handleSubmit}/>
						}
						{
							playerOneImage !== null &&
							<PlayerPreview  avatar={playerOneImage} username={playerOneName}>
								<button
										onClick={this.handleReset.bind(null, 'playerOne')}
										className="reset">
									Reset
								</button>
							</PlayerPreview>
						}

						{
							!playerTwoName &&
							<PlayerInput id='playerTwo' label="Player Two" onSubmit={this.handleSubmit}/>
						}
						{
							playerTwoImage !== null &&
							<PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
								<button
										onClick={this.handleReset.bind(null, 'playerTwo')}
										className="reset">
									Reset
								</button>
							</PlayerPreview>
						}

					</div>
					{
						playerOneImage && playerOneImage &&
						<Link
								className="button"
								to={{
									pathname: match.url + '/results',
									search: `?playerOneName=` + playerOneName + `&playerTwoName=` + playerTwoName
								}}>
							Battle
						</Link>
					}
				</div>
		)
	}
}

export default Battle