// import preact
import { h, Component } from 'preact';
// import required Components from 'components/'
import LandingScreen from './landingScreen';
import {Router} from 'preact-router';
import CurrentLocation from './currentLocation';


export default class App extends Component {
//var App = React.createClass({

	// once the components are loaded, checks if the url bar has a path with "ipad" in it, if so sets state of tablet to be true
	componentDidMount() {
		const urlBar = window.location.href;
		if(urlBar.includes("ipad")) {
			this.setState({
				"isTablet": true
			});
		} else {
			this.setState({
				"isTablet": false
			});
		}
	}

	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render(){
		return (
			<div id="app">
				<Router>
					<LandingScreen path='/' />
					<CurrentLocation path='/currentlocation'/>
					<CurrentLocation path='location/:locationId' />
				</Router>
			</div>
		);
	}
}