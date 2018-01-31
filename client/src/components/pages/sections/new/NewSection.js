import React from 'react';
import PropTypes from 'prop-types';

import NewSectionForm from './NewSectionForm';

const NewSection = ({ match }) => (
  <div className="h100 row d-flex justify-content-center align-items-center">
    <div className="col-xl-5">
      <h2 className="text-center">Nova Seção</h2>
      <small>{match.params.id}</small>
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
