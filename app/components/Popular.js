import React, {Component} from 'react'
import {fetchPopularRepos} from '../utils/api'
import RepoGrid from './RepoGrid'
import PropTypes from 'prop-types'
import Loading from './Loading'

const SelectLanguage = (props) => {
	let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'C', 'C++', 'Nodejs']
	return (
			<ul key='newKey' className="languages">
				{languages.map((lang, i) => {
					return (
							<li
									style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
									key={i}
									onClick={props.onSelect.bind(null, lang)}>
								{lang}
							</li>
					)
				})}
			</ul>
	)
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All'
		};

		this.updateLanguage = this.updateLanguage.bind(this)
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage)
	}

	updateLanguage(lang) {
		fetchPopularRepos(lang)
				.then(item => this.setState(() => {
					return { repos: item }
				}))

		this.setState(() => {
			return {
				selectedLanguage: lang,
				repos: null
			}
		})
	}

	render() {
		console.log(this.state)
		let items = !this.state.repos
				? <Loading key="items"/>
				: <RepoGrid key="grids" repos={this.state.repos}/>
		return (
				<div>
					<SelectLanguage
							selectedLanguage={this.state.selectedLanguage}
							onSelect={this.updateLanguage}
					/>
					{items}
				</div>
		)
	}
}

export default Popular