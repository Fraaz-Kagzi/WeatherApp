// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $, { data } from 'jquery';
import flightAPI from '../../../lib/flightAPI';


export default class FlightInfo extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state = {
			loaded: false,
		}
        flightAPI.fetchFlightData(this.props.iata).then(
			(data) => {
                console.log(data.response)
				this.setState({
					data: data,
					flight_iata: data.response.flight_iata,
					status: data.response.status,
					duration: data.response.duration,
					airline: data.response.airline_name,
					arr_iata: data.response.arr_iata,
					arr_name: data.response.arr_name,
					arr_time: data.response.arr_time_utc,
					dep_iata: data.response.dep_iata,
					dep_name: data.response.dep_name,
					dep_time: data.response.dep_time_utc,
                    loaded: true
				}); 
				
			},
			(reason) => {
				console.log(reason)
			},
		);
	}

	render({}) {

		// display all weather data
		return (
			<div class={style.container}>
				{this.state.loaded ? 
					<div>
						<button class={style.button} onClick={this.remove}><img src="../assets/icons/delete2.svg"></img></button>
						<h1>Flight Number: {this.state.flight_iata}</h1>
						<div>Airline: {this.state.airline}</div>
						<div>Status: {this.state.status}</div>
						<div>Duration: {this.state.duration} minutes</div>
						<div>----------------------------------------</div>
						<div>Dep: {this.state.dep_iata}</div>
						<div>{this.state.dep_name}</div>
						<div>departure time: {this.state.dep_time} UTC</div>
						<div>----------------------------------------</div>
						<div>Arr: {this.state.arr_iata}</div>
						<div>{this.state.arr_name}</div>
						<div>arrival time: {this.state.arr_time} UTC</div>
					</div>
					:
					<div>Flight not Found <button class={style.button} onClick={this.remove}><img src="../assets/icons/delete2.svg"></img></button></div>
				}
			</div>
		);
	}

	remove = () => {
		this.props.func();
	}

}
