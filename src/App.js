import React from "react";
import "./App.css";
import Form from "./Form";
import Forks from "./Forks";
import Pulls from "./Pulls";
const githubApi = username => `https://api.github.com/users/${username}/repos`;
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
    this.sortDate = this.sortDate.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sortDate(array) {
    array.sort(function(a, b) {
      let c = new Date(a.created_at);
      let d = new Date(b.created_at);
      return c > d ? -1 : c < d ? 1 : 0;
    });
  }

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
        <Forks myGithub={this.state.myGithub} sort={this.sortDate} />
        <Pulls myGithubPRs={this.state.myPRs} />
      </div>
    );
  }
}

export default App;
