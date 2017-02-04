import React, { Component } from 'react';
import logo from './logo.svg';
import './App.styl';
import * as $ from 'jquery';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: ""
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>Web Framework Benchmarks</h1>

          <p>
            <b>Url: </b>
            <input
              type="text"
              ref={ (input) => { this.urlInput = input } }
            />
          </p>

          <p>
            <b>Number of requests: </b>
            <input
              type="text"
              ref={ (input) => { this.numberOfRequestInput = input } }
            />
          </p>

          <button onClick={ () => { this.runTest() } }>Start</button>

          <div>
            <b>Result: <span>{ this.state.result }</span></b>
          </div>
        </div>
      </div>
    );
  }

  runTest() {
    const time = Date.now();
    const numberOfRequests = +this.numberOfRequestInput.value;

    this.setState(state =>
      Object.assign({ }, state, {
        result: "Test is running ..."
      })
    );

    const multiAjax = Array.from({ length: numberOfRequests }, (v, k) => k)
    .reduce((pre, cur, id) => 
      pre.concat([
        $.ajax({
          url: +this.urlInput.value
        })
      ])
    , []);

    $.when(...multiAjax).done(() => {
      this.setState(state =>
        Object.assign({ }, state, {
          result: (Date.now() - time) + " ms"
        })
      );
    })
  }
}

export default App;
