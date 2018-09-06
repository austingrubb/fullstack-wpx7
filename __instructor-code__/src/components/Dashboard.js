import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/reducer';
import axios from 'axios';

class Dashboard extends Component {
  componentDidMount() {
    axios.get('/api/user-data').then(response => {
      const user = response.data;
      this.props.logIn(user);
    })
  }

  render() {
    const { user } = this.props;
    
    return (
      <div>
        <h1>Dashboard</h1>
        {user
          ?
            <div>
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              <div>
                <img src={user.picture} alt="User"/>
              </div>
              <div>
                <button onClick={this.props.logOut}>Log out</button>
              </div>
            </div>
          : <div>You need to log in</div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
}

const mapDispatchToProps = {
  logIn,
  logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
