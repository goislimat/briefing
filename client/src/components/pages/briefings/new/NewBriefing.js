import React from 'react';

import { Title } from './styles';
import NewBriefingForm from './NewBriefingForm';

const NewBriefing = () => (
  <div className="h100 row d-flex justify-content-center align-items-center">
    <div className="col-xl-5">
      <Title className="text-center">Novo Briefing</Title>
      <NewBriefingForm />
    </div>
  </div>
);

export default NewBriefing;
