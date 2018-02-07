import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import Yup from 'yup';
import { graphql } from 'react-apollo';

import history from '../../../../history';
import BriefingQuery from '../../../../queries/Briefing';

import { StyledForm, Button } from './styles';
import { error as errorMessage, success } from '../../../alerts';

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
        title={!isValid ? 'Informe pelo menos o título' : ''}
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
      .min(4, 'Mínimo de 4 caracteres')
      .max(25, 'Máximo de 25 caracteres')
      .required('Título obrigatório'),
  }),
  handleSubmit: async (values, { props, resetForm, setSubmitting }) => {
    try {
      const briefing = await props.create(values);

      resetForm();
      history.push(`/dashboard/briefing/${briefing.data.createBriefing._id}/secao/novo`);
      success('Briefing criado!');
    } catch (err) {
      setSubmitting(false);
      errorMessage(err.graphQLErrors[0].message);
    }
  },
})(NewBriefingForm);

const FormWithData = graphql(BriefingQuery.createBriefing, {
  name: 'createBriefing',
  props: ({ createBriefing }) => ({
    create: newBriefing =>
      createBriefing({
        variables: newBriefing,
        update: (store, { data: { createBriefing: createdBriefing } }) => {
          try {
            const data = store.readQuery({
              query: BriefingQuery.briefings,
            });

            data.briefings.push(createdBriefing);

            store.writeQuery({
              query: BriefingQuery.briefings,
              data,
            });
          } catch (e) {} // eslint-disable-line
        },
      }),
  }),
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
