import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import Yup from 'yup';

import { StyledForm, Button } from './styles';

const NewBriefingForm = ({
  touched, errors, isSubmitting, isValid,
}) => (
  <StyledForm>
    <div className="form-group">
      <Field
        name="title"
        type="text"
        placeholder="Título do Briefing"
        className="form-control title"
      />
      {touched.title && errors.title && <small className="text-danger">{errors.title}</small>}
    </div>
    <div className="form-group">
      <Field
        name="description"
        type="text"
        placeholder="Descrição do Briefing (opcional)"
        component="textarea"
        className="form-control description"
        rows="8"
      />
    </div>
    <div className="form-group text-right">
      <Button
        small
        disabled={isSubmitting || !isValid}
        title={isSubmitting || !isValid ? 'Informe pelo menos o título' : ''}
      >
        Próximo
      </Button>
    </div>
  </StyledForm>
);

export default withFormik({
  mapPropsToValues: () => ({
    title: '',
    description: '',
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(3, 'Mínimo de 3 caracteres')
      .required('Título obrigatório'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
  },
})(NewBriefingForm);

NewBriefingForm.propTypes = {
  touched: PropTypes.shape({
    title: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};
