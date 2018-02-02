import React, { Component } from 'react';

class NotFound extends Component {
  componentDidMount() {
    document.body.style.backgroundImage = 'none';
  }

  render() {
    return <div>Endereço não encontrado</div>;
  }
}
export default NotFound;
