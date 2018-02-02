import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import QuestionQuery from '../../../queries/Question';
import { AddQuestionButton } from './styles';
import NewQuestionForm from './NewQuestionForm';

class QuestionsPage extends Component {
  state = {
    showCreateForm: false,
  };

  handleCreateFormVisibility = () => {
    this.setState({ showCreateForm: !this.state.showCreateForm });
  };

  render() {
    const { match, data: { loading, questions } } = this.props;
    const { showCreateForm } = this.state;

    if (loading) return <div>Loading</div>;

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
                <NewQuestionForm
                  sectionId={match.params.id}
                  changeCreateFormVisibility={this.handleCreateFormVisibility}
                />
              </div>
            </div>
          )}
          <div>
            {questions.length === 0 ? (
              <div>Ainda não há perguntas nessa seção</div>
            ) : (
              <div>
                {questions.map(question => <div key={question._id}>{question.questionText}</div>)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const QuestionsPageWithData = graphql(QuestionQuery.questionsBySection, {
  options: props => ({
    variables: {
      _section: props.match.params.id,
    },
  }),
})(QuestionsPage);

export default QuestionsPageWithData;

QuestionsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      questionText: PropTypes.string,
      order: PropTypes.number,
    })),
  }).isRequired,
};
