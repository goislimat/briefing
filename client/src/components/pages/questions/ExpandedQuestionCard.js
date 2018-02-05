import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import QuestionQuery from '../../../queries/Question';

import Loader from '../../styles/Loader';
import QuestionCardInfo from './components/QuestionCardInfo';
import QuestionForm from './components/forms/QuestionForm';

const ExpandedQuestionCard = ({
  mode, onModeChange, sectionId, data: { loading, question },
}) => {
  if (loading) return <Loader />;
  if (mode === 'SHOW') {
    return <QuestionCardInfo question={question} onModeChange={onModeChange} />;
  }
  return (
    <QuestionForm
      question={question}
      sectionId={sectionId}
      mode={mode}
      onModeChange={onModeChange}
    />
  );
};

const ExpandedQuestionCardWithData = graphql(QuestionQuery.question, {
  skip: props => !props.questionId,
  options: props => ({
    variables: {
      _id: props.questionId,
    },
  }),
})(ExpandedQuestionCard);

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
};

ExpandedQuestionCard.defaultProps = {
  data: {},
};
