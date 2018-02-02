import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../../styles/Loader';
import Container from '../../styles/Container';
import { CardGutter, Card } from './styles';

const BriefingsPage = ({ data: { loading, briefings } }) => {
  if (loading) return <Loader />;

  return (
    <Container className="row">
      {briefings.map(briefing => (
        <CardGutter key={briefing._id} className="col-xl-4">
          <Link to={`/dashboard/briefing/${briefing._id}/secao`}>
            <Card>
              <h5>{briefing.title}</h5>
              <div>{briefing.description || 'Sem descrição'}</div>
            </Card>
          </Link>
        </CardGutter>
      ))}
      <CardGutter className="col-xl-4">
        <Link to="/dashboard/briefing/novo">
          <Card>
            <div>Adicionar Briefing</div>
          </Card>
        </Link>
      </CardGutter>
    </Container>
  );
};

const BRIEFINGS_QUERY = gql`
  query briefings {
    briefings {
      _id
      title
      description
    }
  }
`;

const BriefingsPageWithData = graphql(BRIEFINGS_QUERY)(BriefingsPage);

export default BriefingsPageWithData;

BriefingsPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    briefings: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    })),
  }).isRequired,
};
