import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import Sortable from 'sortablejs';

import SectionQuery from '../../../queries/Section';
import QuestionQuery from '../../../queries/Question';

import Loader from '../../styles/Loader';
import { AddQuestionButton, SortingButton } from './styles';
import { CardGutter, Card } from './components/styles';

import QuestionCard from './components/QuestionCard';
import QuestionForm from './components/QuestionForm';

let questionsSortable;

class QuestionsPage extends Component {
  state = {
    showCreateForm: false,
    enableSaveSorting: false,
  };

  handleCreateFormVisibility = () => {
    this.setState({ showCreateForm: !this.state.showCreateForm });
  };

  sortableContainerDecorator = (sortableComponent) => {
    if (sortableComponent) {
      questionsSortable = Sortable.create(sortableComponent, {
        handle: '.move',
        animation: 150,
        store: {
          get: () => [],
          set: () => {},
        },
        onSort: () => {
          this.setState({ enableSaveSorting: true });
        },
      });
    }
  };

  saveSort = () => {
    this.props.saveSorting({
      variables: {
        sorting: questionsSortable.toArray(),
      },
    });

    // se nenhum erro ocorrer
    this.setState({ enableSaveSorting: false });
  };

  render() {
    const { data: { loading, section, error } } = this.props;
    const { showCreateForm, enableSaveSorting } = this.state;

    if (loading) return <Loader />;
    if (error) return <div>No section</div>;

    return (
      <div className="h100">
        <div className="h100">
          <div className="text-right">
            <SortingButton disabled={!enableSaveSorting} onClick={this.saveSort}>
              save sortable
            </SortingButton>
            <AddQuestionButton small onClick={this.handleCreateFormVisibility}>
              Adicionar Pergunta
            </AddQuestionButton>
          </div>
          {showCreateForm && (
            <div className="d-flex justify-content-center">
              <div className="col-xl-8">
                <CardGutter>
                  <Card>
                    <QuestionForm mode="CREATE" />
                  </Card>
                </CardGutter>
              </div>
            </div>
          )}
          <div>
            {section.questions.length === 0 ? (
              <div>Ainda não há perguntas nessa seção</div>
            ) : (
              <div className="row" ref={this.sortableContainerDecorator}>
                {section.questions.map(question => (
                  <QuestionCard key={question._id} mode="SHOW" question={question} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const QuestionsPageWithData = compose(
  graphql(QuestionQuery.saveSorting, {
    name: 'saveSorting',
    options: {
      refetchQueries: ['section'],
    },
  }),
  graphql(SectionQuery.section, {
    options: ({ match }) => ({
      variables: {
        _id: match.params.id,
      },
    }),
  }),
)(QuestionsPage);

export default QuestionsPageWithData;

QuestionsPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      questionText: PropTypes.string,
      order: PropTypes.number,
    })),
  }).isRequired,
  saveSorting: PropTypes.func.isRequired,
};
