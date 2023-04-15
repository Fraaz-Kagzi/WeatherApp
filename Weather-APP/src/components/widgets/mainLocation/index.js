// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import weather API
import WeatherAPI from '../../../lib/WeatherAPI';
import iconDict from '../../../lib/iconDict';
let locationData = null;

export default class MainLocation extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state = {
			loaded: false,
			//used to set correct styling for the page
			secondary: this.props.secondary
		}
		//call weather api -> can be put inside did mount 
		WeatherAPI.getLocData(
			this.props.currentLoc ? this.props.currentLoc :null
		).then((data) => {
			this.setState({
				locationName: data.name,
				locationTime: data.time
			});
			// a call to fetch weather data with given current location -> only if the current location is found
			WeatherAPI.fetchWeatherForLocation(this.state.locationName).then(
				(data) => {
					this.setState({
						locate: data.name,
						temp: Math.round(data.main.temp),
						temp_min: Math.round(data.main.temp_min),
						temp_max: Math.round(data.main.temp_max),
						cond : data.weather[0].description,
						loaded: true,
						icon: iconDict[data.weather['0'].main]
					});  
					
				},
				(reason) => {
					console.error(reason)
				},
			);
		});
	}

	render({}) {
		//create dynamic link for the page
		let baseLink ='/location/'+this.state.locate
		let icon = this.state.icon
		// display all weather data
		return (
			<a href={baseLink}>
			<div class={this.state.secondary ? style.container2 : style.container }>
				{this.state.secondary ? null : <div class={style.currentLoc}>Current Location</div>}
				{this.state.loaded ? 
					<div>
						<div class={style.city}>{ this.state.locate }</div>
						<div class={style.allInfo}>
							<div class={style.info}>
							<div class={style.temperature}>{ this.state.temp }°</div>
							<div class={style.icons}><div id={style[icon]}></div></div>
							</div>
							<div class={style.extraInfo}>
							<div class={style.subtemps}>H: { this.state.temp_max }°</div>
							<div class={style.subtemps}>L: { this.state.temp_min }°</div>
							<div class={style.conditions}>{ this.state.cond }</div>  
							</div>
						</div>
					</div>
					:
					<div>Loading..</div>
				}
				 
			</div>
			</a>
		);
	}

}
