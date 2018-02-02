import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import BriefingQuery from '../../../queries/Briefing';

import Loader from '../../styles/Loader';
import Container from '../../styles/Container';
import { CardGutter, Card } from './styles';

const SectionsPage = ({ data: { loading, briefing, error }, match }) => {
  if (loading) return <Loader />;
  if (error) return <div>No briefing</div>;

  return (
    <Container className="row">
      {briefing.sections.map(section => (
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

const SectionsPageWithData = graphql(BriefingQuery.briefing, {
  options: ({ match }) => ({
    variables: {
      _id: match.params.id,
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
