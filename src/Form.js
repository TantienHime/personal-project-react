import React, { Component } from "react";

class Form extends Component {
  render(props) {
    return (
      <div>
        <h3>
          Please provide the Github username that you would like to search:
        </h3>
        <input
          type="text"
          value={this.props.value}
          onChange={this.props.handleChange}
          username={this.props.username}
        />
        <button onSubmit={this.props.handleSubmit}>Submit</button>
        <p>Username: {this.props.username}</p>
      </div>
    );
  }
}

export default Form;
