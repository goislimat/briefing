import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import BriefingQuery from '../../../queries/Briefing';
import SectionQuery from '../../../queries/Section';

import Loader from '../../styles/Loader';
import { Container, CardGutter, Card, AddButton } from './styles';

import SectionCard from './SectionCard';
import SectionForm from './SectionForm';
import ZeroSectionsPage from './ZeroSectionsPage';

class SectionsPage extends Component {
  state = {
    showCreateForm: false,
  };

  enableCreateForm = () => this.setState({ showCreateForm: true });
  disableCreateForm = () => this.setState({ showCreateForm: false });

  render() {
    const { data: { loading, briefing, error }, match, create } = this.props;
    const { showCreateForm } = this.state;

    if (loading) return <Loader />;
    if (error) return <div>No briefing</div>;
    if (briefing.sections.length === 0) {
      return <ZeroSectionsPage briefing={briefing} createSection={create} />;
    }

    return (
      <Container className="row">
        <h2 className="col-xl-12">Lista de seções do briefing: {briefing.title}</h2>
        {briefing.sections.map(section => (
          <CardGutter key={section._id} className="col-xl-4">
            <SectionCard briefingId={match.params.id} section={section} />
          </CardGutter>
        ))}
        <CardGutter className="col-xl-4">
          <Card
            className={`${
              showCreateForm ? '' : 'effect'
            } d-flex justify-content-center align-items-center flex-column`}
          >
            {showCreateForm ? (
              <SectionForm
                mode="CREATE"
                briefingId={match.params.id}
                createSection={create}
                disableForm={this.disableCreateForm}
              />
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

const SectionsPageWithData = compose(
  graphql(SectionQuery.createSection, {
    name: 'createSection',
    props: ({ createSection, ownProps: { match } }) => ({
      create: newSection =>
        createSection({
          variables: newSection,
          update: (store, { data: { createSection: createdSection } }) => {
            const data = store.readQuery({
              query: BriefingQuery.briefing,
              variables: {
                _id: match.params.id,
              },
            });

            data.briefing.sections.push(createdSection);

            store.writeQuery({
              query: BriefingQuery.briefing,
              variables: {
                _id: match.params.id,
              },
              data,
            });
          },
        }),
    }),
  }),
  graphql(BriefingQuery.briefing, {
    options: ({ match }) => ({
      variables: {
        _id: match.params.id,
      },
    }),
  }),
)(SectionsPage);

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
  create: PropTypes.func.isRequired,
};
