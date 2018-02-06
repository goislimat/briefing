import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import QuestionQuery from '../../../../queries/Question';
import SectionQuery from '../../../../queries/Section';
import { CardInfo, MoveButton, EditButton, DeleteButton } from '../styles';

const QuestionCardInfo = ({
  onModeChange,
  removeQuestion,
  question: {
    _id, questionText, tip, reason, visible, type, options,
  },
}) => (
  <div className="row">
    <CardInfo className="col-xl">
      <small>Pergunta:</small>
      <p className="question">{questionText}</p>
      <small>Dica:</small>
      <p>{tip || 'Nenhuma dica foi fornecida'}</p>
      <small>Motivo:</small>
      <p>{reason || 'Nenhum motivo explicando a razão da pergunta foi fornecido'}</p>
      <small>Visibilidade:</small>
      <p>
        Pergunta visível para o usuário: <strong>{visible ? 'SIM' : 'NÃO'}</strong>
      </p>
      <small>Tipo de resposta:</small>
      <p>
        Pergunta com resposta{' '}
        <strong>{type === 'DISCURSIVA' ? 'discursiva' : 'de múltipla escolha'}</strong>
      </p>
      {type === 'ESCOLHA' && (
        <div>
          <small>Opções:</small>
          <ul>
            {options.map((option, i) => (
              <li key={i}>
                <span>#{i + 1}</span> {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </CardInfo>
    <div className="col-xl-auto d-flex flex-column">
      <MoveButton className="move">
        <i className="fas fa-bars" />
      </MoveButton>
      <EditButton title="Editar pergunta" onClick={() => onModeChange('EDIT')}>
        <i className="fas fa-edit" />
      </EditButton>
      <DeleteButton
        title="Excluir pergunta"
        onClick={() => {
          removeQuestion({
            variables: {
              _id,
            },
            update: (store) => {
              // refatorar isso para question card junto com as queries de question form
            },
          });
        }}
      >
        <i className="fas fa-times" />
      </DeleteButton>
    </div>
  </div>
);

const QuestionCardInfoWithData = graphql(QuestionQuery.removeQuestion, {
  name: 'removeQuestion',
})(QuestionCardInfo);

export default QuestionCardInfoWithData;

QuestionCardInfo.propTypes = {
  onModeChange: PropTypes.func.isRequired,
  question: PropTypes.shape({
    _id: PropTypes.string,
    questionText: PropTypes.string,
    tip: PropTypes.string,
    reason: PropTypes.string,
    visible: PropTypes.bool,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  removeQuestion: PropTypes.func.isRequired,
};
