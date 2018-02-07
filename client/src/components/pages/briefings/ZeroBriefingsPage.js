import React from 'react';
import PropTypes from 'prop-types';

import { Container, CardGutter, Card } from './styles';

import BriefingForm from './BriefingForm';

const ZeroBriefingsPage = ({ createBriefing }) => (
  <Container className="row d-flex justify-content-center">
    <h2 className="col-xl-12 text-center">Você ainda não tem nenhum Briefing</h2>
    <h4 className="col-xl-12 text-center">Comece criando um agora!</h4>
    <CardGutter className="col-xl-6">
      <Card className="d-flex justify-content-center align-items-center flex-column">
        <BriefingForm mode="CREATE" showBackButton={false} createBriefing={createBriefing} />
      </Card>
    </CardGutter>
  </Container>
);

export default ZeroBriefingsPage;

ZeroBriefingsPage.propTypes = {
  createBriefing: PropTypes.func.isRequired,
};
