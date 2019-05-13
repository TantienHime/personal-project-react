import React from 'react';
import './App.css';
import Form from './Form';
import Forks from './Forks';
import Pulls from './Pulls';
// import store from './store'

// Currently reads a static version of my own repos. Need to implement the input of a username.
// import { response } from './tantien-repos';
const githubApi = (username) => `https://api.github.com/users/${username}/repos`; //variable type 'function'
// const githubApi = (username) => `https://api.github.com/users/`+{username}+`/repos`; //variation on the previous line'
const githubApiPR = "https://api.github.com/search/issues?q=author%3Atantienhime+type%3Apr"
const githubApiSearch = "https://api.github.com/search/issues?q=type%3Apr+author%3A"



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "agentultra",
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

  // accepts the username that has been set in the state and passes is to the fetch to retrieve from the API
  handleClick() {
      // this.getGithubUser(this.state.username) // A promise that accepts and passes the username, to return a link
      //   .then(res => res.json())
      //   .then(data => this.setState({ profile: data }))
      //   .catch(err => this.setState({ error: err }));
      fetch(githubApi(this.state.username)) //calls immediately
      // fetch(() => githubApi(this.state.username)) // waits until fetch is called
      .then(res => res.json())
      .then(data => {
        const githubResults = data;
        // console.log(githubResults);
        this.setState({
          myGithub: githubResults
        });
      })
      .catch(error => console.log(error));
  }

  listGithub() {
    // Currently returns the name of the repos for the given user
    return this.state.myGithub
      .filter(githubObject => githubObject.fork === true)
      .map(githubObject => <div><a href={githubObject.html_url}>{githubObject.name}</a></div>)
  }
  
  listGithubPR() {
    // Currently returns the prs for the given user
    return this.state.myPRs.map(githubObject => <div>{githubObject}</div>)
  }

  // This is only fetching my own repo
  componentDidMount() {
    // fetch(githubApi(this.state.username)) //calls immediately
    // // fetch(() => githubApi(this.state.username)) // waits until fetch is called
    // .then(res => res.json())
    // .then(data => {
    //   const githubResults = data;
    //   // console.log(githubResults);
    //   this.setState({
    //     myGithub: githubResults
    //   });
    // })
    // .catch(error => console.log(error));
    
        // Fetch pull requests by username: https://developer.github.com/v3/pulls/#list-pull-requests
    // example https://api.github.com/search/issues?q=author%3Atantienhime+type%3Apr = open
    // Ref: https://stackoverflow.com/questions/17412809/how-to-get-my-pull-requests-from-github-api
  // componentDidMount() {
    fetch(githubApiPR)
      .then(res => res.json())
      .then(data => {
        const githubResults = data;
        // console.log(githubResults);
      this.setState({
        myPRs: githubResults
      });
  })
  .catch(error => console.log(error));

  fetch(githubApiSearch)
  .then(res => res.json())
  .then(data => {
    const githubResults = data;
    // console.log(githubResults);
  this.setState({
    myPRs: githubResults
  });
})
.catch(error => console.log(error));
    
    // for the thunk one, use the component did mount to call to the store
    
    // This is only meant to be used when the API cannot be reached. Local dev only
    /*
    this.setState({
      myGithub: response
    });
    */
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
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          username = {this.state.username} 
        />
        {this.listGithub()} 
        {/* {this.listGithubPR()}  */}
        {/* {console.log(this.state.myPRs.items)} */}
        <Forks />
        <Pulls />
      </div>
    );
  }
}

export default App;
