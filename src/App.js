import React from 'react';
import './App.css';
import Form from './Form';
import Forks from './Forks';
import Pulls from './Pulls';
const githubApi = "https://api.github.com/users/pkanal/repos";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myGithub: {}
    };
  }

  // listGithub() {
  //   return this.state.myGithub.map(githubObject => <div>{githubObject.id}</div>)
  // }
  // Fetch pull requests by username: https://developer.github.com/v3/pulls/#list-pull-requests
  // example https://api.github.com/search/issues?q=author%3Atantienhime+type%3Apr = open
  // Ref: https://stackoverflow.com/questions/17412809/how-to-get-my-pull-requests-from-github-api
//   componentDidMount() {
//     fetch(githubApi)
//       .then(res => res.json())
//       .then(data => {
//         const githubResults = data.results;
        
//       this.setState({
//         myGithub: githubResults
//       });
//   });
//   console.log(this.state.myGithub);
// }
  render() {
    return (
      <div>
        <header>
          <h1>Personal Project with React</h1>
          <h2>by Shanta R. Nathwani - Cohort 7</h2>
        </header>
        Your stuff here
        {/* {this.listGithub()} */}
        <Form />
        <Forks />
        <Pulls />
      </div>
    );
  }
}

export default App;
