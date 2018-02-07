import React from 'react';
import { withFormik, Form, Field } from 'formik';

const SectionForm = () => (
  <Form>
    Voltar
    <Field name="title" type="text" placeholder="Título da seção" />
  </Form>
);

const EnhancedForm = withFormik({
  mapPropsToValues: props => ({
    title: '',
  }),
})(SectionForm);

export default EnhancedForm;
