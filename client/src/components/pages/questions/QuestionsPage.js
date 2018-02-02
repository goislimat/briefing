import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import SectionQuery from '../../../queries/Section';
import { AddQuestionButton } from './styles';
import NewQuestionForm from './NewQuestionForm';
import QuestionCard from './components/QuestionCard';
import Loader from '../../styles/Loader';

class QuestionsPage extends Component {
  state = {
    showCreateForm: false,
  };

  handleCreateFormVisibility = () => {
    this.setState({ showCreateForm: !this.state.showCreateForm });
  };

  render() {
    const { match, data: { loading, section, error } } = this.props;
    const { showCreateForm } = this.state;

    if (loading) return <Loader />;
    if (error) return <div>No section</div>;

    return (
      <div className="h100">
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
            {section.questions.length === 0 ? (
              <div>Ainda não há perguntas nessa seção</div>
            ) : (
              <div className="row">
                {section.questions.map(question => (
                  <QuestionCard key={question._id} question={question} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const QuestionsPageWithData = graphql(SectionQuery.section, {
  options: ({ match }) => ({
    variables: {
      _id: match.params.id,
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
