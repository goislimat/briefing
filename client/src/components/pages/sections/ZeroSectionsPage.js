import React from 'react';
import PropTypes from 'prop-types';

import { Container, CardGutter, Card } from './styles';

import SectionForm from './SectionForm';

const ZeroSectionsPage = ({ briefing, createSection }) => (
  <Container className="row d-flex justify-content-center">
    <h2 className="col-xl-12 text-center">
      Você ainda não tem nenhuma Seção no briefing {briefing.title}
    </h2>
    <h4 className="col-xl-12 text-center">Comece criando um agora!</h4>
    <CardGutter className="col-xl-6">
      <Card className="d-flex justify-content-center align-items-center flex-column">
        <SectionForm
          mode="CREATE"
          briefingId={briefing._id}
          showBackButton={false}
          createSection={createSection}
        />
      </Card>
    </CardGutter>
  </Container>
);

export default ZeroSectionsPage;

ZeroSectionsPage.propTypes = {
  briefing: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  createSection: PropTypes.func.isRequired,
};
