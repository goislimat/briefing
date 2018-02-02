import gql from 'graphql-tag';

export default {
  sections: gql`
    query sections($_briefing: String!) {
      sections(_briefing: $_briefing) {
        _id
        title
        description
      }
    }
  `,
};
