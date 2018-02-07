import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import Yup from 'yup';

import { StyledForm, FormGroup, SaveButton, BackButton } from './styles';

const UserForm = ({
  disableForm, touched, errors, isSubmitting, isValid, resetForm,
}) => (
  <StyledForm className="col-xl row">
    <div className="col-xl">
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
        <Field name="company" placeholder="Nome da empresa" className="w100 company" />
        {touched.company &&
          errors.company && <small className="text-danger">{errors.company}</small>}
      </FormGroup>
      <FormGroup>
        <Field name="name" placeholder="Nome do cliente" className="w100" />
        {touched.name && errors.name && <small className="text-danger">{errors.name}</small>}
      </FormGroup>
      <FormGroup>
        <Field name="email" placeholder="E-mail do cliente" className="w100" />
        {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}
      </FormGroup>
    </div>
    <SaveButton
      small
      className="col-xl-12"
      disabled={isSubmitting || !isValid}
      title={!isValid ? 'Preencha o form' : ''}
    >
      Salvar
    </SaveButton>
  </StyledForm>
);

const EnhancedForm = withFormik({
  mapPropsToValues: ({ user }) => {
    if (user) return user;
    return {
      company: '',
      email: '',
      name: '',
    };
  },
  isInitialValid: ({ user }) => user.company && user.email && user.name,
  validationSchema: Yup.object().shape({
    company: Yup.string()
      .min(2, 'Mínimo de 2 caracteres')
      .max(30, 'Máximo de 30 caracteres')
      .required('Nome da empresa é obrigatório'),
    name: Yup.string()
      .min(2, 'Mínimo de 2 caracteres')
      .max(30, 'Máximo de 30 caracteres')
      .required('Nome do cliente é obrigatório'),
    email: Yup.string()
      .min(2, 'Mínimo de 2 caracteres')
      .max(50, 'Máximo de 50 caracteres')
      .required('E-mail é obrigatório'),
  }),
  handleSubmit: (values) => {
    console.log(values);
  },
})(UserForm);

export default EnhancedForm;

UserForm.propTypes = {
  disableForm: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    company: PropTypes.bool,
    name: PropTypes.bool,
    email: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    company: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
};
