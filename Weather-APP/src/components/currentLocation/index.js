// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';

import { BrowserRouter, Router,Link, Route } from 'preact-router';
import MainLocation from '../widgets/mainLocation';
import WeatherAPI from '../../lib/WeatherAPI';
import Button from '../widgets/button';
import DailyInfo from '../widgets/dailyInfo';
import flightAPI from '../../lib/flightAPI';
import FlightInfo from '../widgets/flightInfo';
import SearchBar from '../widgets/searchBar';
import SmallInfo from '../widgets/smallInfo';
//date picker


export default class CurrentLocation extends Component {

	constructor(props){
		super(props);
		this.state = {
			//if the prop gets passed a location (from weather tabs) save it in the state
			location: this.props.locationId,
			addFlight: true
		};
		this.removeFlight = this.removeFlight.bind(this)

		let iata =sessionStorage.getItem("iata")
		console.log(iata)
		//used state saved props to call weather api for weekly forecast
		WeatherAPI.weeklyForecast(this.state.location).then(
			(data) => {
				this.setState({
					dailyData: data.list
				}); 
				//shorten list to 5 days
				let list = [...this.state.dailyData]
				let arr = []
				for(var i=0;i<list.length;i+=8){
					arr = [...arr,list[i]]
				} 
				//save shortend list
				this.setState({newlist: arr});
				
			},
			(reason) => {
				console.log(reason)
			},
		);

		if(iata != null){
			this.state = {
				iata: iata,
				addFlight: false,
				display: false
			}
		}
		else{
			this.state = {
				iata: null,
				addFlight: true,
				display: false
			}
		}
		
		

	}


	render({},{locations}) {
		let flightLink = "/location/"+this.props.locationId+"/flight"
		
		return (
			<div class={style.container }>	
				<div class={style.midSec}>
					<MainLocation secondary={true} currentLoc={this.props.locationId} />
					
					<div class={style.weeklyForecast}>
						<WeeklyForecast list={this.state.newlist} />
					</div>

					<div class={style.smallInfo}>
						<SmallInfo name='humidity' location={this.props.locationId} />
						<SmallInfo name='windspeed' location={this.props.locationId} />
						<SmallInfo name='visibility' location={this.props.locationId} />
						<SmallInfo name='pressure' location={this.props.locationId} />
						<SmallInfo name='sunrise' location={this.props.locationId} />
						<SmallInfo name='sunset' location={this.props.locationId} />
					</div>

					{this.state.addFlight ? <button class={style.optButton} onClick={this.showSearch}>Track a flight</button> : null}
						
					<div class={style.showFlightInfo}>
					{ this.state.display ? <SearchBar onSubmit={this.showFlightInfo} placeholder='Add Flight IATA'/> : null }
					</div>

					<div>{console.log('this is ',this.state.iata)}</div>

					<div>  {(() => {
							if (this.state.iata != null) {
							return (
								<div><FlightInfo  iata={this.state.iata} func={this.removeFlight}/></div>
							)
							} 
						})()}
					</div>
				</div>	
				<div class={style.navbar}>
					<a href='/'><button class={style.home}><img src="../../../assets/icons/home.svg" height="40" width="40"></img></button></a>
				</div>
			</div>
		);
	}
	//show search menu
	showSearch = () =>{
		let display = !this.state.display
		this.setState({display})
	};

	showFlightInfo = searchData => {
		console.log(searchData)
		console.log(searchData.text); // do something with the search data
		this.setState({
			iata: searchData.text.toUpperCase()
		}); 
		let display = !this.state.display
		let addFlight = !this.state.addFlight
		

		sessionStorage.setItem("iata",this.state.iata)
		
		this.setState({addFlight})
		this.setState({display})
		
		
		
	  };

	  removeFlight = () =>{
		let addFlight = !this.state.addFlight
		this.setState({addFlight})
		this.setState({iata:null})
		sessionStorage.removeItem("iata")
		
		
	};

}


function WeeklyForecast(props){
    if(props.list){
        let currentDate = new Date().getDate();
        let firstDay = new Date(props.list[0].dt_txt).getDate();
        // sets the day of the week for today
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const dayList = props.list.map((day, index) => {
            let dayOfWeek = days[new Date(day.dt_txt).getDay()];
            if (index === 0 && currentDate === firstDay) {
                // if the day of the week is the same as todays date from the api request then we set it = to today
                dayOfWeek = "Today";
            }
            return <DailyInfo day={dayOfWeek} temp_max={Math.round(day.main.temp_max)} temp_min={Math.round(day.main.temp_min)} icon={day.weather[0].main}  />;
            // else we just pass in the other days
        });

        return <div><ul>{dayList}</ul></div>
    }
}
