// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../widgets/button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../widgets/button';
import LocationTab from '../widgets/locationTab';
import MainLocation from '../widgets/mainLocation';
import SearchBar from '../widgets/searchBar';
	
import { BrowserRouter, Router,Link, Route } from 'preact-router';

export default class LandingScreen extends Component {

	constructor(props){
		super(props);
		//set list to session stored json list
		let list =sessionStorage.getItem("list")
		//if list is empty creat new array
		if(list === null){
			this.state = {
				locations: [],
				display: false
			};
		}
		//if list has elements then reload them into the locations variable in the state
		else{
			let prs = JSON.parse(list)
			//save parsed locations to the state
			this.state = {
				locations: prs
			}
		}
		this.removeLocation = this.removeLocation.bind(this)
	}

	render({},{locations}) {
		  
		return (
			<div class={ style.container }>	
				{ this.state.display ? <SearchBar onSubmit={this.addLocation} placeholder='Search locations'/>: null }
				
				<div>
					<MainLocation secondary={false} />
				</div>
				<div class={style.locTabs}>
					<LocationList locs={locations} func={this.removeLocation} />
				</div>
				<div class={style.navbar}>
					<a><button class={style.addLoc} onClick={this.showSearch}><img src="./assets/icons/add.svg" height="45" width="45"></img></button></a>
				</div>
			</div>
		);
	}

	//similar to remove
	addLocation = loc => {
		//add new location to array
		let locations = [...this.state.locations,loc]
		//change display state to hide search menu
		let display = !this.state.display
		//save updates to state
		this.setState({locations})
		this.setState({display})
		//create session storage to hold users added locations
		let locList = JSON.stringify(this.state.locations)
		sessionStorage.setItem("list",locList)
	};

	//take id from clicked tab remove it from the list + update session 
	removeLocation = (id) =>{
		let locations = this.state.locations.filter(loc => loc.id !== id)
		this.setState({locations})
		let locList = JSON.stringify(this.state.locations)
		sessionStorage.setItem("list",locList)
		
	};

	//show search menu
	showSearch = () =>{
		let display = !this.state.display
		this.setState({display})
	};

}

//take list of locations from state and map it to location widgets => return empty list element if no locations
function LocationList(props){
	if(props.locs.length === 0){
		return <ul></ul>
	}
	else{
		let baseLink = "/location/"
		const locationList = props.locs.map((locs) =><LocationTab key={locs.id.toString()} id={locs.id} name={locs.text} onRemoval={props.func} link={baseLink+locs.text}/>)
		return <div class={style.savedLoc}><div class={style.savedLocText}>Saved Locations</div><ul>{locationList}</ul></div>
	}
	
}
