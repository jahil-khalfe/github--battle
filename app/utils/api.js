import axios from 'axios'

let params = "?client_id=009246e6177c1fb40166&client_secret=a55a49939371585b744cf9cd6e09e8aa50539b0b"

const fetchPopularRepos = (language) => {
	let encodedUri = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories')
	return axios.get(encodedUri)
			.then(response => response.data.items)
}

const getProfile = (username) => axios
		.get('https://api.github.com/users/' + username + params)
		.then(user => user.data)


const getRepos = (username) => axios
		.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')


const getStarCount = (repos) => repos
		.data
		.reduce((count, repo) => (count + repo.stargazers_count), 0)


const calculateScore = (profile, repos) => {
	let followers = profile.followers,
			totlaStars = getStarCount(repos)
	return (followers * 3) + totlaStars
}

const handleError = (error) => {
	console.log(error)
	return null
}

const getUserData = (player) => (
		axios.all([
			getProfile(player),
			getRepos(player)
		]).then(data => {
			let profile = data[0]
			let repos = data[1]
			return {
				profile: profile,
				score: calculateScore(profile, repos)
			}
		})
)

const sortPlayers = (players) => players.sort((a, b) => b.score - a.score)


const battle = (players) => axios
		.all(players.map(getUserData))
		.then(sortPlayers)
		.catch(handleError)


export  {fetchPopularRepos, battle}