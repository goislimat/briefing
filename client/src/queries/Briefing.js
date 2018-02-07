import gql from 'graphql-tag';

export default {
  briefings: gql`
    query briefings {
      briefings {
        _id
        title
        description
      }
    }
  `,
  briefing: gql`
    query($_id: String!) {
      briefing(_id: $_id) {
        _id
        title
        sections {
          _id
          title
          description
        }
      }
    }
  `,
  menuBriefings: gql`
    query {
      briefings {
        _id
        title
        sections {
          _id
          title
        }
      }
    }
  `,
  createBriefing: gql`
    mutation($title: String!, $description: String) {
      createBriefing(title: $title, description: $description) {
        _id
        title
        description
      }
    }
  `,
  updateBriefing: gql`
    mutation($_id: String!, $title: String!, $description: String) {
      updateBriefing(_id: $_id, title: $title, description: $description) {
        _id
        title
        description
      }
    }
  `,
  removeBriefing: gql`
    mutation($_id: String!) {
      removeBriefing(_id: $_id)
    }
  `,
};
