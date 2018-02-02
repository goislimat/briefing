import gql from 'graphql-tag';

export default {
  briefing: gql`
    query($_id: String!) {
      briefing(_id: $_id) {
        _id
        sections {
          _id
          title
          description
        }
      }
    }
  `,
};
