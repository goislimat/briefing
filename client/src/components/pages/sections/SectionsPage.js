import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Container from '../../styles/Container';
import { CardGutter, Card } from './styles';

const SectionsPage = ({ data: { loading, sections }, match }) => {
  if (loading) return <div>Loading...</div>;
  if (sections.length === 0) return <div>Não há dados para mostrar</div>;
  return (
    <Container className="row">
      {sections.map(section => (
        <CardGutter key={section._id} className="col-xl-4">
          <Link to={`/dashboard/secao/${section._id}/perguntas`}>
            <Card>
              <h5>{section.title}</h5>
              <div>{section.description || 'Sem descrição'}</div>
            </Card>
          </Link>
        </CardGutter>
      ))}
      <CardGutter className="col-xl-4">
        <Link to={`/dashboard/briefing/${match.params.id}/secao/novo`}>
          <Card>
            <div>Adicionar secão</div>
          </Card>
        </Link>
      </CardGutter>
    </Container>
  );
};

const SECTIONS_QUERY = gql`
  query sections($_briefing: String!) {
    sections(_briefing: $_briefing) {
      _id
      title
      description
    }
  }
`;

const SectionsPageWithData = graphql(SECTIONS_QUERY, {
  options: ({ match }) => ({
    variables: {
      _briefing: match.params.id,
    },
  }),
})(SectionsPage);

export default SectionsPageWithData;

SectionsPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    sections: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
