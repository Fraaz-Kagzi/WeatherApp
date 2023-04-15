// import preact
import { h, render, Component } from 'preact';
import style from "./style_iphone"
	
export default class Button extends Component {

	// rendering a function when the button is clicked
	render() {
		let cFunction = this.props.onClick;
		let name = this.props.name
		if(typeof cFunction !== 'function'){
			cFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={style.container}>
				<button onClick={cFunction}>
					{name}
				</button>
			</div>
		);
	}
}
