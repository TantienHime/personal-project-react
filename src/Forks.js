import React, { Component } from "react";

class Forks extends Component {
  constructor(props) {
    super(props);
    this.listGithub = this.listGithub.bind(this);
  }

  listGithub(myGithub) {
    return myGithub
      .filter(githubObject => githubObject.fork === true)
      .map(githubObject => (
        <p key={githubObject.id}>
          <a href={githubObject.html_url}>{githubObject.name}</a> Date:{" "}
          {githubObject.created_at}
        </p>
      ));
  }

  render() {
    this.props.sort(this.props.myGithub);
    return (
      <div>
        <h1>Forks</h1>
        {this.listGithub(this.props.myGithub)}
      </div>
    );
  }
}

export default Forks;
