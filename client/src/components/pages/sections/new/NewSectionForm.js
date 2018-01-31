import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import Yup from 'yup';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { StyledForm, Button } from './styles';

const NewSectionForm = ({
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

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    title: '',
    description: '',
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(3, 'Mínimo de 3 caracteres')
      .required('Título obrigatório'),
  }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    let section = null;
    try {
      section = await props.createSection({
        variables: {
          _briefing: props.briefingId,
          title: values.title,
          description: values.description,
        },
      });
    } catch (err) {
      console.log('err', err);
    } finally {
      setSubmitting(false);
    }

    console.log('briefing', section);
  },
})(NewSectionForm);

const CREATE_SECTION_QUERY = gql`
  mutation createSection($_briefing: String!, $title: String!, $description: String) {
    createSection(_briefing: $_briefing, title: $title, description: $description) {
      _id
    }
  }
`;

const FormWithData = graphql(CREATE_SECTION_QUERY, {
  name: 'createSection',
})(EnhancedForm);

export default FormWithData;

NewSectionForm.propTypes = {
  touched: PropTypes.shape({
    title: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};