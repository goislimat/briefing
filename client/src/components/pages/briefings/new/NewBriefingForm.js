import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import Yup from 'yup';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import history from '../../../../history';
import { StyledForm, Button } from './styles';
import { error as errorMessage } from '../../../alerts';

const NewBriefingForm = ({
  touched, errors, isSubmitting, isValid,
}) => (
  <StyledForm>
    <div className="form-group">
      <Field name="title" type="text" placeholder="Título do Briefing" className="title" />
      {touched.title && errors.title && <small className="text-danger">{errors.title}</small>}
    </div>
    <div className="form-group">
      <Field
        name="description"
        type="text"
        placeholder="Descrição do Briefing (opcional)"
        component="textarea"
        rows="5"
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
  handleSubmit: async (values, { props, resetForm }) => {
    let briefing = null;
    try {
      briefing = await props.createBriefing({
        variables: {
          title: values.title,
          description: values.description,
        },
      });
    } catch (err) {
      return errorMessage(err.graphQLErrors[0].message);
    } finally {
      resetForm();
    }

    return history.push(`/dashboard/briefing/${briefing.data.createBriefing._id}/secao/novo`);
  },
})(NewBriefingForm);

const CREATE_BRIEFING_QUERY = gql`
  mutation createBriefing($title: String!, $description: String) {
    createBriefing(title: $title, description: $description) {
      _id
    }
  }
`;

const FormWithData = graphql(CREATE_BRIEFING_QUERY, {
  name: 'createBriefing',
})(EnhancedForm);

export default FormWithData;

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
