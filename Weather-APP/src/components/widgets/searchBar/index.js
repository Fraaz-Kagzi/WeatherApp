
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import the Button component


export default class SearchBar extends Component {
    state = { value: '' };
  
    //return an object that creates random id and stores input field from the form to be returned
    //returns it as params that can be put directly into another function
    onSubmit = e => {
      e.preventDefault();
      this.props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: this.state.value
      });

      this.setState('');
    };
  
    handleChange = e => {
        const {value} = e.target
        this.setState({value})

    }

  
    render(_, { value }) {
      return (
        <form onSubmit={this.onSubmit}>
          <input class={style.searchBar}type="text" value={value}  onChange={this.handleChange} placeholder={this.props.placeholder} />

          <button class={style.searchButton} type="submit">GO</button>
        </form>
      );
    }
  }
