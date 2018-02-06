import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import Sortable from 'sortablejs';

import SectionQuery from '../../../queries/Section';
import QuestionQuery from '../../../queries/Question';

import Loader from '../../styles/Loader';
import { CardGutter, Card, AddQuestionButton, SortingButton } from './styles';

import QuestionCard from './QuestionCard';
import QuestionForm from './components/forms/QuestionForm';

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
    const { create, match: { params: { id } }, data: { loading, section, error } } = this.props;
    const { showCreateForm, enableSaveSorting } = this.state;

    if (loading) return <Loader />;
    if (error) return <div>No section</div>;

    return (
      <div className="h100">
        <div className="h100">
          <div className="text-right">
            <SortingButton disabled={!enableSaveSorting} onClick={this.saveSort}>
              salvar ordenação
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
                    <QuestionForm
                      sectionId={id}
                      mode="CREATE"
                      handleCreateFormVisibility={this.handleCreateFormVisibility}
                      createQuestion={create}
                    />
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
                  <QuestionCard key={question._id} sectionId={id} mode="SHOW" question={question} />
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
  graphql(QuestionQuery.createQuestion, {
    name: 'createQuestion',
    props: ({ createQuestion, ownProps: { match } }) => ({
      create: newQuestion =>
        createQuestion({
          variables: newQuestion,
          update: (store, { data: { createQuestion: createdQuestion } }) => {
            const data = store.readQuery({
              query: SectionQuery.section,
              variables: {
                sectionId: match.params.id,
              },
            });

            data.section.questions.push(createdQuestion);

            store.writeQuery({
              query: SectionQuery.section,
              variables: {
                sectionId: match.params.id,
              },
              data,
            });
          },
        }),
    }),
  }),
  graphql(QuestionQuery.saveSorting, {
    name: 'saveSorting',
    options: {
      refetchQueries: ['section'],
    },
  }),
  graphql(SectionQuery.section, {
    options: ({ match }) => ({
      variables: {
        sectionId: match.params.id,
      },
    }),
  }),
)(QuestionsPage);

export default QuestionsPageWithData;

QuestionsPage.propTypes = {
  create: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      questionText: PropTypes.string,
      order: PropTypes.number,
    })),
  }).isRequired,
  saveSorting: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
