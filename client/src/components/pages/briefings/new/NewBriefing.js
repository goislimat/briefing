import React from 'react';

import NewBriefingForm from './NewBriefingForm';

const NewBriefing = () => (
  <div className="h100 row d-flex justify-content-center align-items-center">
    <div className="col-xl-5">
      <h2 className="text-center">Novo Briefing</h2>
      <NewBriefingForm />
    </div>
  </div>
);

export default NewBriefing;
