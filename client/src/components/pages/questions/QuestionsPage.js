import React from 'react';

import data from './data';
import { CardGutter, Card, QuestionDiv } from './styles';

const chooseSizeByType = type => (type === 2 ? 'col-xl-12' : 'col-xl-6');

const QuestionsPage = () => (
  <div className="row">
    {data.questions.map(question => (
      <CardGutter key={question.id} className={chooseSizeByType(question.type)}>
        <Card>
          {/* <div>#{question.order}</div> */}
          <QuestionDiv className="row d-flex align-items-start">
            <div className="col-xl">{question.questionText}?</div>
            <div className="col-xl-auto">
              <i className="fa fa-bars" aria-hidden="true" />
            </div>
          </QuestionDiv>
          <div>Dica: {question.tip || 'Em branco'}</div>
          <div>Motivo: {question.reason || 'Em branco'}</div>
          <div>Obrigatória: {question.required.toString()}</div>
          <div>Visível: {question.visible.toString()}</div>
          <div>Tipo: {question.type === 1 ? 'Discursiva' : 'Múltipla escolha'}</div>
        </Card>
      </CardGutter>
    ))}
  </div>
);

export default QuestionsPage;
