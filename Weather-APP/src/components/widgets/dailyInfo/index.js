// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import icon dict
import iconDict from '../../../lib/iconDict';

let locationData = null;

export default class DailyInfo extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state = {
			icon: iconDict[this.props.icon]
		}
		
	}

	render({}) {
		
		// display all weather data
		return (
			<div>
				<p>{this.props.day} &nbsp;  

					<div class={style.icons}>
						<div id={style[this.state.icon]}></div>
					</div>
					
					&nbsp; H:{this.props.temp_max}° &nbsp; L:{this.props.temp_min}° <hr></hr>
				</p>
			</div>
			
		);
	}

}
