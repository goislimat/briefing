import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';

import BriefingQuery from '../../../queries/Briefing';

import { Card, Actions, Button } from './styles';
import BriefingForm from './BriefingForm';

class BriefingCard extends Component {
  state = {
    showEditForm: false,
  };

  enableEditForm = () => this.setState({ showEditForm: true });
  disableEditForm = () => this.setState({ showEditForm: false });

  render() {
    const { briefing, update, remove } = this.props;
    const { showEditForm } = this.state;

    if (showEditForm) {
      return (
        <Card className="d-flex justify-content-center align-items-center flex-column">
          <BriefingForm
            briefing={briefing}
            mode="EDIT"
            updateBriefing={update}
            disableForm={this.disableEditForm}
          />
        </Card>
      );
    }

    return (
      <Card className="effect d-flex justify-content-center align-items-center flex-column">
        <Link to={`/dashboard/briefing/${briefing._id}/secao`}>
          <h4>{briefing.title}</h4>
          {briefing.description && <div className="text-center">{briefing.description}</div>}
        </Link>
        <Actions className="d-flex justify-content-between">
          <Button type="button" onClick={this.enableEditForm}>
            Editar
          </Button>
          <Button type="button" onClick={() => remove(briefing._id)}>
            Excluir
          </Button>
        </Actions>
      </Card>
    );
  }
}

const BriefingCardWithData = compose(
  graphql(BriefingQuery.removeBriefing, {
    name: 'removeBriefing',
    props: ({ removeBriefing }) => ({
      remove: briefingId =>
        removeBriefing({
          variables: {
            _id: briefingId,
          },
          update: (store, { data: { removeBriefing: removedBriefing } }) => {
            if (!removedBriefing) return;

            const data = store.readQuery({
              query: BriefingQuery.briefings,
            });

            const removedIndex = data.briefings.findIndex(el => el._id === briefingId);
            data.briefings.splice(removedIndex, 1);

            store.writeQuery({
              query: BriefingQuery.briefings,
              data,
            });
          },
        }),
    }),
  }),
  graphql(BriefingQuery.updateBriefing, {
    name: 'updateBriefing',
    props: ({ updateBriefing }) => ({
      update: briefingData =>
        updateBriefing({
          variables: briefingData,
        }),
    }),
  }),
)(BriefingCard);

export default BriefingCardWithData;

BriefingCard.propTypes = {
  briefing: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
