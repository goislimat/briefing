import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import SectionQuery from '../../../queries/Section';
import QuestionQuery from '../../../queries/Question';

import Loader from '../../styles/Loader';
import QuestionCardInfo from './components/QuestionCardInfo';
import QuestionForm from './components/forms/QuestionForm';

const ExpandedQuestionCard = ({
  mode,
  onModeChange,
  sectionId,
  data: { loading, question },
  update,
  remove,
}) => {
  if (loading) return <Loader />;
  if (mode === 'SHOW') {
    return (
      <QuestionCardInfo question={question} onModeChange={onModeChange} removeQuestion={remove} />
    );
  }
  return (
    <QuestionForm
      question={question}
      sectionId={sectionId}
      mode={mode}
      onModeChange={onModeChange}
      updateQuestion={update}
    />
  );
};

const ExpandedQuestionCardWithData = compose(
  graphql(QuestionQuery.updateQuestion, {
    name: 'updateQuestion',
    props: ({ updateQuestion }) => ({
      update: newValues =>
        updateQuestion({
          variables: newValues,
        }),
    }),
  }),
  graphql(QuestionQuery.removeQuestion, {
    name: 'removeQuestion',
    props: ({ removeQuestion, ownProps: { sectionId } }) => ({
      remove: questionId =>
        removeQuestion({
          variables: {
            questionId,
          },
          update: (store, { data: { removeQuestion: removedQuestion } }) => {
            if (!removedQuestion) return;

            const data = store.readQuery({
              query: SectionQuery.section,
              variables: {
                sectionId,
              },
            });

            const removedIndex = data.section.questions.findIndex(el => el._id === questionId);
            data.section.questions.splice(removedIndex, 1);

            store.writeQuery({
              query: SectionQuery.section,
              variables: {
                sectionId,
              },
              data,
            });
          },
        }),
    }),
  }),
  graphql(QuestionQuery.question, {
    skip: props => !props.questionId,
    options: props => ({
      variables: {
        _id: props.questionId,
      },
    }),
  }),
)(ExpandedQuestionCard);

export default ExpandedQuestionCardWithData;

ExpandedQuestionCard.propTypes = {
  mode: PropTypes.string.isRequired,
  onModeChange: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool,
    question: PropTypes.shape({
      _id: PropTypes.string,
    }),
  }),
  sectionId: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

ExpandedQuestionCard.defaultProps = {
  data: {},
};
