import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import Yup from 'yup';
import { graphql } from 'react-apollo';

import history from '../../../../history';
import BriefingQuery from '../../../../queries/Briefing';
import SectionQuery from '../../../../queries/Section';

import { StyledForm, Button } from './styles';
import { error as errorMessage, success } from '../../../alerts';

const NewSectionForm = ({
  touched, errors, isSubmitting, isValid,
}) => (
  <StyledForm>
    <div className="form-group">
      <Field name="title" type="text" placeholder="Título da Seção" className="title" />
      {touched.title && errors.title && <small className="text-danger">{errors.title}</small>}
    </div>
    <div className="form-group">
      <Field
        name="description"
        type="text"
        placeholder="Descrição da Seção (opcional)"
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
      .min(4, 'Mínimo de 4 caracteres')
      .max(25, 'Máximo de 25 caracteres')
      .required('Título obrigatório'),
  }),
  handleSubmit: async (values, { props, resetForm, setSubmitting }) => {
    try {
      const section = await props.create({ ...values, _briefing: props.briefingId });

      resetForm();
      history.push(`/dashboard/secao/${section.data.createSection._id}/perguntas`);
      success('Seção criada!');
    } catch (err) {
      setSubmitting(false);
      errorMessage(err.graphQLErrors[0].message);
    }
  },
})(NewSectionForm);

const FormWithData = graphql(SectionQuery.createSection, {
  name: 'createSection',
  props: ({ createSection, ownProps: { briefingId } }) => ({
    create: newSection =>
      createSection({
        variables: newSection,
        //   update: (store, { data: { createSection: createdSection } }) => {
        //     const data = store.readQuery({
        //       query: BriefingQuery.briefing,
        //       variables: {
        //         _id: briefingId,
        //       },
        //     });

        //     console.log('data', data);

        //     data.briefing.sections.push(createdSection);

        //     store.writeQuery({
        //       query: BriefingQuery.briefing,
        //       variables: {
        //         _id: briefingId,
        //       },
        //       data,
        //     });
        //   },
      }),
  }),
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
