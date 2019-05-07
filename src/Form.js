import React, { Component } from "react";

class Form extends Component {
  render() {
    return (
      <div>
        <h3>
          Please provide the Github username that you would like to search:{" "}
        </h3>
        <input type="text" />
        <button>Submit</button>
      </div>
    );
  }
}

export default Form;
