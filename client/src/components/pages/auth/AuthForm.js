import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form } from 'formik';
import { graphql, withApollo } from 'react-apollo';

import Accounts from '../../../api/Accounts';
import UserQuery from '../../../queries/User';
import history from '../../../history';
import { error as errorMessage } from '../../alerts';

import { InlineField } from './styles';
import LoginFormActions from './LoginFormActions';

const LoginForm = ({
  errors, touched, isSubmitting, isValid,
}) => (
  <Form className="row d-flex justify-content-end d-flex align-content-between flex-wrap">
    <InlineField
      label="E-mail"
      type="email"
      name="email"
      placeholder="antonio@email.com"
      touched={touched.email}
      error={errors.email}
    />
    <InlineField
      label="Senha"
      type="password"
      name="password"
      placeholder="********"
      touched={touched.password}
      error={errors.password}
    />
    {history.location.pathname === '/cadastro' && (
      <InlineField
        label="Confirmar Senha"
        type="password"
        name="passwordConfirmation"
        placeholder="********"
        touched={touched.passwordConfirmation}
        error={errors.passwordConfirmation}
      />
    )}
    <LoginFormActions isSubmitting={isSubmitting} isValid={isValid} />
  </Form>
);

const EnhancedForm = withFormik({
  mapPropsToValues: ({ email }) => ({ email: email || '', password: '', passwordConfirmation: '' }),
  validate: (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'E-mail obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'E-mail inválido';
    }

    if (!values.password) {
      errors.password = 'Senha obrigatória';
    } else if (values.password.length < 6) {
      errors.password = 'Mínimo de 6 caracteres';
    }

    if (history.location.pathname === '/cadastro') {
      if (values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = 'As senhas devem ser iguais';
      }
    }

    return errors;
  },
  handleSubmit: async (values, { props, setSubmitting }) => {
    if (history.location.pathname === '/cadastro') {
      let res;

      try {
        res = await props.setPassword({
          variables: {
            email: values.email.toLowerCase(),
            password: values.password,
            passwordConfirmation: values.passwordConfirmation,
          },
        });
      } catch (err) {
        errorMessage(err.graphQLErrors[0].message);
      } finally {
        setSubmitting(false);
      }
      if (!res) return;
    }

    try {
      const user = await Accounts.loginWithPassword({
        ...values,
        email: values.email.toLowerCase(),
      });
      if (user) {
        await props.client.resetStore();
      }
    } catch (err) {
      errorMessage(err.response.data.info.message);
    } finally {
      setSubmitting(false);
    }
  },
})(LoginForm);

export default graphql(UserQuery.setPassword, {
  name: 'setPassword',
  options: {
    refetchQueries: ['isAuthenticated'],
  },
})(withApollo(EnhancedForm));

LoginForm.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    email: PropTypes.bool,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};
