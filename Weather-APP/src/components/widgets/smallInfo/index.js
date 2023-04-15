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

export default class SmallInfo extends Component {
//var Iphone = React.createClass({
	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state = {
			loaded: false,
			location: this.props.location
		}
	}

    componentDidMount(){
        //weather api
        WeatherAPI.fetchWeatherForLocation(this.state.location).then(
            (data) => {
                console.log(data)
                this.setState({
                    //save all infor that small widgets might have
                    humidity: data.main.humidity,
                    windspeed: data.wind.speed,
                    visibility: data.visibility,
                    pressure: data.main.pressure,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    loaded: true
                });             
            },
            (reason) => {
                console.error(reason)
            },
        );
    }

	render({}) {
        //check the name passed in as props and set the appropriate data for the widget
		return (
			<div class={style.container }>
				<div class={style.currentLoc}>{this.props.name}</div>
				{this.state.loaded ? 
					<div>
                        {(() => {
								if (this.props.name === 'humidity') {
								return (
									<div>{this.state.humidity}%</div>
								)
								}
                                else if(this.props.name === 'windspeed'){
                                return (
									<div>{this.state.windspeed} mph</div>
								)
                                }
                                else if(this.props.name === 'visibility'){
                                    return (
                                        <div>{this.state.visibility} mi</div>
                                    )
                                }
                                else if(this.props.name === 'pressure'){
                                    return (
                                        <div>{this.state.pressure} hpa</div>
                                    )
                                }
                                else if(this.props.name === 'sunrise'){
                                    var time_to_show = this.state.sunrise; // unix timestamp in seconds

                                    var t = new Date(time_to_show * 1000);
                                    var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
                                return (
                                    <div>{formatted} AM</div>
                                )
                                }
                                else if(this.props.name === 'sunset'){
                                    var time_to_show = this.state.sunset; // unix timestamp in seconds

                                    var t = new Date(time_to_show * 1000);
                                    var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
                                    
                                return (
                                    <div>{formatted} PM</div>
                                )
                                }
							})()}
					</div>
					:
					<div>Loading..</div>
				}			 
			</div>
		);
	}

}
