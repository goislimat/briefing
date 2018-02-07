import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';

import { error as errorMessage, success } from '../../alerts';
import { FormGroup, BackButton, SaveButton } from './styles';

const SectionForm = ({
  disableForm, touched, errors, resetForm, isSubmitting, isValid,
}) => (
  <Form>
    <div>
      <BackButton
        type="button"
        onClick={() => {
          resetForm();
          disableForm();
        }}
      >
        <i className="fas fa-angle-left" /> <small>Voltar</small>
      </BackButton>
    </div>

    <FormGroup>
      <small>Título:</small>
      <Field name="title" type="text" placeholder="Título da seção" className="col-xl-12 title" />
      {touched.title && errors.title && <small className="text-danger">{errors.title}</small>}
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
      <SaveButton
        type="submit"
        disabled={isSubmitting || !isValid}
        title={!isValid ? 'Preencha o form' : ''}
      >
        Salvar
      </SaveButton>
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
  isInitialValid: ({ mode }) => mode === 'EDIT',
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(4, 'Mínimo de 4 caracteres')
      .max(25, 'Máximo de 25 caracteres')
      .required('Título é obrigatório'),
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    try {
      if (props.mode === 'CREATE') {
        await props.createSection({ ...values, _briefing: props.briefingId });

        resetForm();
        props.disableForm();
        success('Seção criada!');
      } else {
        await props.updateSection(values);

        props.disableForm();
        success('Dados da seção alterados!');
      }
    } catch (err) {
      setSubmitting(false);
      errorMessage(err.graphQLErrors[0].message);
    }
  },
})(SectionForm);

export default EnhancedForm;

SectionForm.propTypes = {
  disableForm: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    title: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  resetForm: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};
