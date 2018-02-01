import React from 'react';
import { withFormik, Field } from 'formik';

import { CardGutter, CardForm, SaveButton } from './styles';

const NewQuestionForm = ({ values }) => (
  <CardGutter>
    <CardForm>
      <div className="form-group">
        <Field
          name="questionText"
          type="text"
          placeholder="Texto da nova pergunta"
          className="pergunta"
        />
      </div>
      <div className="form-group">
        <Field
          name="tip"
          placeholder="Dica para resposta da pergunta (opcional)"
          component="textarea"
        />
      </div>
      <div className="form-group">
        <Field
          name="reason"
          placeholder="Por que essa pergunta é importante? (opicional)"
          component="textarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="visible">
          <Field id="visible" name="visible" type="checkbox" checked={values.visible} /> Pergunta
          visível para o usuário
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="discursive">
          <Field
            id="discursive"
            name="type"
            type="radio"
            value="DISCURSIVA"
            checked={values.type === 'DISCURSIVA'}
          />{' '}
          Discursiva
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="choice">
          <Field
            id="choice"
            name="type"
            type="radio"
            value="ESCOLHA"
            checked={values.type === 'ESCOLHA'}
          />{' '}
          Múltipla Escolha
        </label>
      </div>
      <div className="form-group">
        <SaveButton>Salvar</SaveButton>
      </div>
    </CardForm>
  </CardGutter>
);

export default withFormik({
  mapPropsToValues: () => ({
    questionText: '',
    tip: '',
    reason: '',
    visible: true,
    type: '',
  }),
  handleSubmit: (values) => {
    console.log(values);
  },
})(NewQuestionForm);
