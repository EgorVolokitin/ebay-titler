import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', data: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var content = document.getElementById('content');

      let xhr = new XMLHttpRequest();
      xhr.open('post', '/getStore', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({value: this.state.value}));

      let getData;
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          getData = JSON.parse(xhr.response).data;

           if(getData) {
            ReactDOM.render(
              <List store={getData} />,
              content
            );
           }
          // alert(Object.keys(data).length);

        }
        // this.setState({ data: getData });

      }

      
  }

  render() {
    return (
      <div>
        <input type="text"
          placeholder="Hello!"
          value={this.state.value}
          onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>
          Найти магазин
        </button>
        <div id="content"></div>
      </div>
    );
  }
}

export default App;