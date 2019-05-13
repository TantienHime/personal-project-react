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
          name="username"
          label="Github Username"
          onChange={this.props.handleChange}
          value={this.props.username}
          // username={this.props.username}
        />
        <button onClick={this.props.handleClick}>Submit</button>
        {/* Just outputs the username to check acceptance */}
        <p>Username: {this.props.username}</p>
      </div>
    );
  }
}

export default Form;
