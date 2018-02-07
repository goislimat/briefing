import React from 'react';
import { withFormik, Form, Field } from 'formik';

import { FormGroup, BackButton, SaveButton } from './styles';

const SectionForm = ({ mode, disableForm }) => (
  <Form>
    <div>
      <BackButton type="button" onClick={disableForm}>
        <i className="fas fa-angle-left" /> <small>Voltar</small>
      </BackButton>
    </div>

    <FormGroup>
      <small>Título:</small>
      <Field name="title" type="text" placeholder="Título da seção" className="col-xl-12 title" />
    </FormGroup>
    <FormGroup>
      <small>Descrição:</small>
      <Field
        name="description"
        component="textarea"
        placeholder="Descrição da seção (opcional)"
        rows="4"
        className="col-xl-12"
      />
      <SaveButton type="submit">Salvar</SaveButton>
    </FormGroup>
  </Form>
);

const EnhancedForm = withFormik({
  mapPropsToValues: ({ section }) => {
    if (section) return section;
    return {
      title: '',
      description: '',
    };
  },
})(SectionForm);

export default EnhancedForm;
