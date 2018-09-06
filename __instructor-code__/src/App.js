import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  login = () => {
    // window.location.origin means `this website, whichever one I'm currently on`, e.g. http://localhost:3000
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    const scope = encodeURIComponent('openid profile email');
    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`;
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default App;
