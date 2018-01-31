import React from 'react';
import PropTypes from 'prop-types';

import NewSectionForm from './NewSectionForm';

const NewSection = ({ match }) => (
  <div className="h100 row d-flex justify-content-center align-items-center">
    <div className="col-xl-5">
      <h2 className="text-center">Nova seção</h2>
      <div className="text-center">
        Cada briefing é formado de várias seções, cadastre a primeira para poder começar a adicionar
        perguntas
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
