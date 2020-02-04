import React from 'react';

//MUI
import { Grid } from '@material-ui/core';

//Youtube API
import youtube from './api/youtube'

//components
import VideoDetail from './components/VideoDetail'
import SearchBar from './components/SearchBar'
import VideoList from './components/VideoList'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			videos: [],
			selectedVideo: null
		}
	}

	componentDidMount(){
		this.handleSubmit('React library is best')
	}

	handleSubmit = async (searchTerm) => {
		const response = await youtube.get('search', {
			params: {
				part: 'snippet',
				maxResults: 5,
				key: 'AIzaSyAv5j3RJuxwnyIM1BroX2QBtAaj8HwMQOc',
				q: searchTerm
			}
		})

		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0]
		})
	}

	onVideoSelect = (video) => {
		this.setState({ selectedVideo: video})
	}

	render() {
		const { selectedVideo, videos } = this.state;

		return (
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<SearchBar onFormSubmit={this.handleSubmit}/>
						</Grid>
						<Grid item xs={8}>
							<VideoDetail video={selectedVideo}/>
						</Grid>
						<Grid item xs={4}>
							<VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

export default App
