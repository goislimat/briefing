import React from 'react';
import PropTypes from 'prop-types';

import { Title } from './styles';
import NewSectionForm from './NewSectionForm';

const NewSection = ({ match }) => (
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

export default NewSection;

NewSection.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
