// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import weather api
import WeatherAPI from '../../../lib/WeatherAPI';
import iconDict from '../../../lib/iconDict';


export default class LocationTab extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// button display state
		this.state.tabId = this.props.id
		
	}

    componentDidMount(){
		WeatherAPI.fetchWeatherForLocation(this.props.name).then(
			(data) => {
				console.log(data) 
				this.setState({
					locate: data.name,
					temp: data.main.temp,
					temp_min: Math.round(data.main.temp_min),
					temp_max: Math.round(data.main.temp_max),
					cond: data.weather[0].description,
					//load in name of icon from dictionary translation
					icon: iconDict[data.weather['0'].main]
				});  
			},
			(reason) => {
				console.log(reason)
				this.setState({
					locate: this.props.name
				})
			},
		);
    }

	render() {
		// display all weather data
		let icon = this.state.icon
		return (
			<div class={style.container}>
				<a href={this.props.link}>
					<div class={style.left}>
						<div class={style.city}>{this.state.locate}</div>
						<div class={style.subTemp}>H:{this.state.temp_max} &nbsp; L:{this.state.temp_min}</div>
						<div class={style.conditions}>{this.state.cond}</div>
					</div>
					<div class={style.right}>
						<div class={style.icons}>
							<div id={style[icon]}></div>
						</div>
					</div>
				</a>
				<button class={style.button} onClick={this.remove}><img src="/assets/icons/delete2.svg"></img></button>
			</div>			
		);
	}

	//call for remove command from landingScreen (bound method)
	remove = () => {
		this.props.onRemoval(this.props.id);
	}

}
