import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import BriefingQuery from '../../../queries/Briefing';

import Loader from '../../styles/Loader';
import { Container, CardGutter, Card, AddButton } from './styles';

import BriefingCard from './BriefingCard';
import BriefingForm from './BriefingForm';
import ZeroBriefingsPage from './ZeroBriefingsPage';
import NewBriefingFromDashboardPage from './NewBriefingFromDashboardPage';

class BriefingPage extends Component {
  state = {
    showCreateForm: false,
  };

  enableCreateForm = () => this.setState({ showCreateForm: true });
  disableCreateForm = () => this.setState({ showCreateForm: false });

  render() {
    const { data: { loading, briefings }, location, create } = this.props;
    const { showCreateForm } = this.state;

    if (loading) return <Loader />;
    if (location.new) return <NewBriefingFromDashboardPage createBriefing={create} />;
    if (briefings.length === 0) return <ZeroBriefingsPage createBriefing={create} />;

    return (
      <Container className="row">
        <h2 className="col-xl-12">Sua lista de briefings</h2>
        {briefings.map(briefing => (
          <CardGutter key={briefing._id} className="col-xl-4">
            <BriefingCard briefing={briefing} />
          </CardGutter>
        ))}
        <CardGutter className={`${location.new ? 'from-dashboard' : ''} col-xl-4`}>
          <Card
            className={`${
              showCreateForm ? '' : 'effect'
            } d-flex justify-content-center align-items-center flex-column`}
          >
            {showCreateForm ? (
              <BriefingForm
                mode="CREATE"
                createBriefing={create}
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

const BriefingPageWithData = compose(
  graphql(BriefingQuery.createBriefing, {
    name: 'createBriefing',
    props: ({ createBriefing }) => ({
      create: newBriefing =>
        createBriefing({
          variables: newBriefing,
          update: (store, { data: { createBriefing: createdBriefing } }) => {
            const data = store.readQuery({
              query: BriefingQuery.briefings,
            });

            data.briefings.push(createdBriefing);

            store.writeQuery({
              query: BriefingQuery.briefings,
              data,
            });
          },
        }),
    }),
  }),
  graphql(BriefingQuery.briefings),
)(BriefingPage);

export default BriefingPageWithData;

BriefingPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    Briefings: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired),
  }).isRequired,
  location: PropTypes.shape({
    new: PropTypes.bool,
  }).isRequired,
  create: PropTypes.func.isRequired,
};
