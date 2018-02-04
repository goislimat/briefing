import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../../styles/Loader';
import QuestionCardInfo from './components/QuestionCardInfo';
import QuestionForm from './components/forms/QuestionForm';

const ExpandedQuestionCard = ({ mode, onModeChange, data: { loading, question } }) => {
  if (loading) return <Loader />;
  if (mode === 'SHOW') {
    return <QuestionCardInfo question={question} onModeChange={onModeChange} />;
  }
  return <QuestionForm question={question} mode={mode} onModeChange={onModeChange} />;
};

const QUESTION_QUERY = gql`
  query question($_id: String!) {
    question(_id: $_id) {
      _id
      order
      questionText
      reason
      tip
      type
      visible
      options
    }
  }
`;

const ExpandedQuestionCardWithData = graphql(QUESTION_QUERY, {
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
};

ExpandedQuestionCard.defaultProps = {
  data: {},
};
