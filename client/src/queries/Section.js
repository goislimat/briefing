import gql from 'graphql-tag';

export default {
  sections: gql`
    query($_briefing: String!) {
      sections(_briefing: $_briefing) {
        _id
        title
        description
      }
    }
  `,
  section: gql`
    query($_id: String!) {
      section(_id: $_id) {
        _id
        title
        questions {
          _id
          order
          questionText
        }
      }
    }
  `,
};
