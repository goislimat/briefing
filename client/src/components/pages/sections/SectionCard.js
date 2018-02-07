import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Actions, Button } from './styles';
import SectionForm from './SectionForm';

class SectionCard extends Component {
  state = {
    showEditForm: false,
  };

  enableEditForm = () => this.setState({ showEditForm: true });
  disableEditForm = () => this.setState({ showEditForm: false });

  render() {
    const { section } = this.props;
    const { showEditForm } = this.state;

    if (showEditForm) {
      return (
        <Card className="d-flex justify-content-center align-items-center flex-column">
          <SectionForm section={section} mode="EDIT" disableForm={this.disableEditForm} />
        </Card>
      );
    }

    return (
      <Card className="effect d-flex justify-content-center align-items-center flex-column">
        <Link to={`/dashboard/secao/${section._id}/perguntas`}>
          <h4>{section.title}</h4>
          {section.description && <div>{section.description}</div>}
        </Link>
        <Actions className="d-flex justify-content-between">
          <Button type="button" onClick={this.enableEditForm}>
            Editar
          </Button>
          <Button type="button">Excluir</Button>
        </Actions>
      </Card>
    );
  }
}

export default SectionCard;

SectionCard.propTypes = {
  section: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
