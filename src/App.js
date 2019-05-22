import React from "react";
import "./App.css";
import Form from "./Form";
import Forks from "./Forks";
import Pulls from "./Pulls";
// import store from './store'
// import { response } from "./agentultra-prs";
const githubApi = username => `https://api.github.com/users/${username}/repos`; //variable type 'function'
const githubApiPR = username =>
  `https://api.github.com/search/issues?q=author%3A${username}+type%3Apr`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      myGithub: [],
      myPRs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // This takes the contents of the input and outputs it to the screen currently.
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // accepts the username that has been set in the state and passes is to the fetch to retrieve from the API for FORKS
  handleClick() {
    fetch(githubApi(this.state.username)) //calls immediately
      .then(res => res.json())
      .then(data => {
        const githubResults = data;
        fetch(githubApiPR(this.state.username))
          .then(resPR => resPR.json())
          .then(dataPR => {
            const githubResultsPR = dataPR;
            this.setState({
              myGithub: githubResults,
              myPRs: githubResultsPR.items
            });
          });
      })
      .catch(error => console.log(error));
  }

  listGithub() {
    // Currently returns the name of the repos for the given user
    return this.state.myGithub
      .filter(githubObject => githubObject.fork === true)
      .map(githubObject => (
        <div>
          <a href={githubObject.html_url}>{githubObject.name}</a>
        </div>
      ));
  }

  listGithubPR() {
    return this.state.myPRs.map(githubPR => (
      <div>
        <p>
          <a href={githubPR.html_url}>{githubPR.title}</a> Status:{" "}
          {githubPR.state}
        </p>
      </div>
    ));
  }

  // This is only meant to be used when the API cannot be reached. Local dev only
  /*  
    this.setState({
      myGithub: response
    });
    
  }
  */
  render() {
    return (
      <div>
        <header>
          <h1>Personal Project with React</h1>
          <h2>by Shanta R. Nathwani - Cohort 7</h2>
        </header>
        Please provide the username for which you would like to see results:
        <Form
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          username={this.state.username}
        />
        <Forks />
        {this.listGithub()}
        <Pulls />
        {this.listGithubPR()}
      </div>
    );
  }
}

export default App;
