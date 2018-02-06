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
    query section($sectionId: String!) {
      section(_id: $sectionId) {
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
