import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';

import history from '../../../history';

import { error as errorMessage, success } from '../../alerts';
import { FormGroup, BackButton, SaveButton } from './styles';

const BriefingForm = ({
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
      <Field
        name="title"
        type="text"
        placeholder="Título do briefing"
        className="col-xl-12 title"
      />
      {touched.title && errors.title && <small className="text-danger">{errors.title}</small>}
    </FormGroup>
    <FormGroup>
      <small>Descrição:</small>
      <Field
        name="description"
        component="textarea"
        placeholder="Descrição do briefing (opcional)"
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
  mapPropsToValues: ({ briefing }) => {
    if (briefing) return briefing;
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
        const newBriefing = await props.createBriefing(values);

        resetForm();
        props.disableForm();
        if (props.fromDashboard) {
          history.push(`/dashboard/briefing/${newBriefing.data.createBriefing._id}/secao`);
        }
        success('Briefing criado!');
      } else {
        await props.updateBriefing(values);

        props.disableForm();
        success('Dados do briefing alterados!');
      }
    } catch (err) {
      setSubmitting(false);
      console.log('err', err);
      errorMessage(err.graphQLErrors[0].message);
    }
  },
})(BriefingForm);

export default EnhancedForm;

BriefingForm.propTypes = {
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
