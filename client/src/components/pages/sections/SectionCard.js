import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';

import BriefingQuery from '../../../queries/Briefing';
import SectionQuery from '../../../queries/Section';

import { Card, Actions, Button } from './styles';
import SectionForm from './SectionForm';

class SectionCard extends Component {
  state = {
    showEditForm: false,
  };

  enableEditForm = () => this.setState({ showEditForm: true });
  disableEditForm = () => this.setState({ showEditForm: false });

  render() {
    const { section, update, remove } = this.props;
    const { showEditForm } = this.state;

    if (showEditForm) {
      return (
        <Card className="d-flex justify-content-center align-items-center flex-column">
          <SectionForm
            section={section}
            mode="EDIT"
            updateSection={update}
            disableForm={this.disableEditForm}
          />
        </Card>
      );
    }

    return (
      <Card className="effect d-flex justify-content-center align-items-center flex-column">
        <Link to={`/dashboard/secao/${section._id}/perguntas`}>
          <h4>{section.title}</h4>
          {section.description && <div className="text-center">{section.description}</div>}
        </Link>
        <Actions className="d-flex justify-content-between">
          <Button type="button" onClick={this.enableEditForm}>
            Editar
          </Button>
          <Button type="button" onClick={() => remove(section._id)}>
            Excluir
          </Button>
        </Actions>
      </Card>
    );
  }
}

const SectionCardWithData = compose(
  graphql(SectionQuery.removeSection, {
    name: 'removeSection',
    props: ({ removeSection, ownProps: { briefingId } }) => ({
      remove: sectionId =>
        removeSection({
          variables: {
            _id: sectionId,
          },
          update: (store, { data: { removeSection: removedSection } }) => {
            if (!removedSection) return;

            const data = store.readQuery({
              query: BriefingQuery.briefing,
              variables: {
                _id: briefingId,
              },
            });

            const removedIndex = data.briefing.sections.findIndex(el => el._id === sectionId);
            data.briefing.sections.splice(removedIndex, 1);

            store.writeQuery({
              query: BriefingQuery.briefing,
              variables: {
                _id: briefingId,
              },
              data,
            });
          },
        }),
    }),
  }),
  graphql(SectionQuery.updateSection, {
    name: 'updateSection',
    props: ({ updateSection }) => ({
      update: sectionData =>
        updateSection({
          variables: sectionData,
        }),
    }),
  }),
)(SectionCard);

export default SectionCardWithData;

SectionCard.propTypes = {
  section: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  update: PropTypes.func.isRequired,
};
