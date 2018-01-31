import React, { Component } from 'react';

class QuestionsPage extends Component {
  state = {
    showCreateForm: false,
  };

  handleCreateFormVisibility = () => {
    this.setState({ showCreateForm: !this.state.showCreateForm });
  };

  render() {
    const { match } = this.props;
    const { showCreateForm } = this.state;

    return (
      <div className="h100">
        <div>id da seção: {match.params.id}</div>
        <div className="h100">
          <div className="text-right">
            <button>Adicionar Pergunta</button>
          </div>
          {showCreateForm && <form>form de cadastro</form>}
          <div>
            Restante das perguntas existentes na seção ou mensagem de vazio, caso não haja nada
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionsPage;
