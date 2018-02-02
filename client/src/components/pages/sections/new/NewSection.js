import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Title } from './styles';
import NewSectionForm from './NewSectionForm';

const NewSection = ({ data: { loading, error }, match }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>No briefing</div>;

  return (
    <div className="h100 row d-flex justify-content-center align-items-center">
      <div className="col-xl-5">
        <Title className="text-center">Nova seção</Title>
        <div className="text-center">
          <p>Cada briefing é formado de várias seções.</p>
          <p>Ao adicionar essa seção, poderá começar a informar as perguntas que a compõem.</p>
        </div>
        <NewSectionForm briefingId={match.params.id} />
      </div>
    </div>
  );
};

const BRIEFING_QUERY = gql`
  query($_id: String!) {
    briefing(_id: $_id) {
      _id
    }
  }
`;

const NewSectionWithData = graphql(BRIEFING_QUERY, {
  options: ({ match }) => ({
    variables: {
      _id: match.params.id,
    },
  }),
})(NewSection);

export default NewSectionWithData;

NewSection.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
