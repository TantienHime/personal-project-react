import React, { Component } from "react";

class Pulls extends Component {
  constructor(props) {
    super(props);
    this.listGithubPR = this.listGithubPR.bind(this);
  }
  listGithubPR(myPRs) {
    return myPRs.map(githubPR => (
      <p key={githubPR.id}>
        <a href={githubPR.html_url}>{githubPR.title}</a> Status:{" "}
        {githubPR.state} Date: {githubPR.created_at}
      </p>
    ));
  }
  render() {
    return (
      <div>
        <h1>Pulls</h1>
        {this.listGithubPR(this.props.myGithubPRs)}
      </div>
    );
  }
}

export default Pulls;
