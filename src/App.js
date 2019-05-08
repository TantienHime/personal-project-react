import React from 'react';
import './App.css';
import Form from './Form';
import Forks from './Forks';
import Pulls from './Pulls';

// Currently reads a static version of my own repos. Need to implement the input of a username.
import { response } from './tantien-repos';
const githubApi = "https://api.github.com/users/tantienhime/repos";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      myGithub: []
    };
  this.handleChange = this.handleChange.bind(this);
  this.handleClick = this.handleClick.bind(this);
  }

  // This works. Rather than handleChange, might need onSubmit instead. Need both?
  handleChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleClick() {
      this.getGithubUser(this.state.username)
        .then(res => res.json())
        .then(data => this.setState({ profile: data }))
        .catch(err => this.setState({ error: err }));
  }

  getGithubUser(username) {
    return fetch('https://api.github.com/users/${username}'); //double check the ${username} part
  }

  listGithub() {
    return this.state.myGithub.map(githubObject => <div>{githubObject.name}</div>)
  }
  // Fetch pull requests by username: https://developer.github.com/v3/pulls/#list-pull-requests
  // example https://api.github.com/search/issues?q=author%3Atantienhime+type%3Apr = open
  // Ref: https://stackoverflow.com/questions/17412809/how-to-get-my-pull-requests-from-github-api
  componentDidMount() {
    fetch(githubApi)
      .then(res => res.json())
      .then(data => {
        const githubResults = data;
        console.log(githubResults);
      this.setState({
        myGithub: githubResults
      });
  })
  .catch(error => console.log(error));
  
  // This is only meant to be used when the API cannot be reached. Local dev only
  this.setState({
      myGithub: response
    });

}
  render() {
    return (
      <div>
        <header>
          <h1>Personal Project with React</h1>
          <h2>by Shanta R. Nathwani - Cohort 7</h2>
        </header>
        Please provide the username for which you would like to see results:
        <Form 
          username = {this.state.username}
          handleChange={this.handleChange}
          handleClick={this.handleClick} 
        />
        {/* List of github repo id's for TantienHime */}
        {this.listGithub()} 
        {/* {console.log(this.state.myGithub)} */}
        <Forks />
        <Pulls />
      </div>
    );
  }
}

export default App;
