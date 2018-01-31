import React, { Component } from 'react';

import data from './data';
import { Button } from './styles';
import UserCard from './UserCard';

class UserPage extends Component {
  state = {
    omit: true,
  };

  handleAddClick = () => this.setState({ omit: !this.state.omit });

  render() {
    const { omit } = this.state;

    return (
      <div>
        <div className="d-flex justify-content-end">
          <Button onClick={this.handleAddClick}>Adicionar Cliente</Button>
        </div>
        <div className="row">
          <UserCard omit={omit} user={data.userTemplate} />
          {data.users.map(user => <UserCard key={user.id} omit={omit} user={user} />)}
        </div>
      </div>
    );
  }
}

export default UserPage;
