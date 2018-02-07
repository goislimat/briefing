import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import BriefingQuery from '../../../queries/Briefing';

import Loader from '../../styles/Loader';
import Container from '../../styles/Container';
import { CardGutter, Card, AddButton } from './styles';

import SectionCard from './SectionCard';
import SectionForm from './SectionForm';

class SectionsPage extends Component {
  state = {
    showCreateForm: false,
  };

  enableCreateForm = () => this.setState({ showCreateForm: true });
  disableCreateForm = () => this.setState({ showCreateForm: false });

  render() {
    const { data: { loading, briefing, error } } = this.props;
    const { showCreateForm } = this.state;

    if (loading) return <Loader />;
    if (error) return <div>No briefing</div>;

    return (
      <Container className="row">
        {briefing.sections.map(section => (
          <CardGutter key={section._id} className="col-xl-4">
            <SectionCard section={section} />
          </CardGutter>
        ))}
        <CardGutter className="col-xl-4">
          <Card
            className={`${
              showCreateForm ? '' : 'effect'
            } d-flex justify-content-center align-items-center flex-column`}
          >
            {showCreateForm ? (
              <SectionForm mode="CREATE" disableForm={this.disableCreateForm} />
            ) : (
              <AddButton type="button" onClick={this.enableCreateForm}>
                <i className="fas fa-plus-circle" />
              </AddButton>
            )}
          </Card>
        </CardGutter>
      </Container>
    );
  }
}

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
};
