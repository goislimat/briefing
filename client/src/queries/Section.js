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
  createSection: gql`
    mutation($_briefing: String!, $title: String!, $description: String) {
      createSection(_briefing: $_briefing, title: $title, description: $description) {
        _id
        title
        description
      }
    }
  `,
  updateSection: gql`
    mutation($_id: String!, $title: String!, $description: String) {
      updateSection(_id: $_id, title: $title, description: $description) {
        _id
        title
        description
      }
    }
  `,
  removeSection: gql`
    mutation($_id: String!) {
      removeSection(_id: $_id)
    }
  `,
};
