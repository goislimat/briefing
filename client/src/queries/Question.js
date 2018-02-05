import gql from 'graphql-tag';

export default {
  questionsBySection: gql`
    query questionsBySection($_section: String!) {
      questions(_section: $_section) {
        _id
        order
        questionText
      }
    }
  `,
  question: gql`
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
  `,
  createQuestion: gql`
    mutation createQuestion(
      $questionText: String!
      $type: QuestionType!
      $_section: String!
      $reason: String
      $tip: String
      $visible: Boolean
      $options: [String]
    ) {
      createQuestion(
        questionText: $questionText
        type: $type
        _section: $_section
        reason: $reason
        tip: $tip
        visible: $visible
        options: $options
      ) {
        _id
        order
        questionText
      }
    }
  `,
  saveSorting: gql`
    mutation($sorting: [String]!) {
      saveSorting(sorting: $sorting)
    }
  `,
};
