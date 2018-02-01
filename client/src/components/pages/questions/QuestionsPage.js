import React, { Component } from 'react';

import { AddQuestionButton } from './styles';
import NewQuestionForm from './NewQuestionForm';

class QuestionsPage extends Component {
  state = {
    showCreateForm: true,
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
            <AddQuestionButton small onClick={this.handleCreateFormVisibility}>
              Adicionar Pergunta
            </AddQuestionButton>
          </div>
          {showCreateForm && (
            <div className="d-flex justify-content-center">
              <div className="col-xl-9">
                <NewQuestionForm />
              </div>
            </div>
          )}
          <div>
            Restante das perguntas existentes na seção ou mensagem de vazio, caso não haja nada
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionsPage;
