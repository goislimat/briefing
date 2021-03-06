import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import Yup from 'yup';

import { error as errorMessage, success } from '../../alerts';
import { StyledForm, FormGroup, UserActions, ActionButton, SaveButton, BackButton } from './styles';

const UserForm = ({
  user,
  mode,
  changeUserBlockStatus,
  resetPassword,
  disableForm,
  touched,
  errors,
  isSubmitting,
  isValid,
  resetForm,
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

    {mode === 'EDIT' && (
      <UserActions className="col-xl-auto">
        <div className={user.active ? 'block' : 'unblock'}>
          <ActionButton
            type="button"
            className={user.active ? 'block' : ''}
            onClick={() => changeUserBlockStatus({ _id: user._id, active: !user.active })}
          >
            <i className="fas fa-ban" />
          </ActionButton>
        </div>
        <div className="reset">
          <ActionButton
            type="button"
            disabled={!user.passwordSet}
            title={!user.passwordSet ? 'Ainda não definiu a senha' : ''}
            onClick={() => resetPassword(user._id)}
          >
            <i className="fas fa-unlock" />
          </ActionButton>
        </div>
      </UserActions>
    )}

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
    if (user) {
      return {
        _id: user._id,
        company: user.company || '',
        email: user.email || '',
        name: user.name || '',
        active: user.active || true,
        passwordSet: user.passwordSet || false,
      };
    }
    return {
      company: '',
      email: '',
      name: '',
      active: true,
      passwordSet: false,
    };
  },
  isInitialValid: ({ user }) => !!user && !!user.company && !!user.email && !!user.name,
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
      .email('E-mail inválido')
      .min(2, 'Mínimo de 2 caracteres')
      .max(50, 'Máximo de 50 caracteres')
      .required('E-mail é obrigatório'),
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    let message = '';
    try {
      if (props.mode === 'CREATE') {
        await props.createUser(values);
        message = 'Usuário criado!';
      } else {
        await props.updateUser(values);
        message = 'Usuário atualizado!';
      }
      resetForm();
      props.disableForm();
      success(message);
    } catch (err) {
      setSubmitting(false);
      errorMessage(err.graphQLErrors[0].message);
    }
  },
})(UserForm);

export default EnhancedForm;

UserForm.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    active: PropTypes.bool,
    passwordSet: PropTypes.bool,
  }),
  mode: PropTypes.string.isRequired,
  changeUserBlockStatus: PropTypes.func,
  resetPassword: PropTypes.func,
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

UserForm.defaultProps = {
  user: {},
  changeUserBlockStatus: () => {},
  resetPassword: () => {},
};
