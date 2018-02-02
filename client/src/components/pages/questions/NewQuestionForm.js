import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import { graphql } from 'react-apollo';
import Yup from 'yup';

import { error as errorMessage, success as successMessage } from '../../alerts';
import QuestionQuery from '../../../queries/Question';
import {
  CardGutter,
  CardForm,
  SaveButton,
  StyledCheckbox,
  TextoForRadio,
  StyledRadio,
} from './styles';
import OptionsInput from './OptionsInput';

class NewQuestionForm extends Component {
  addOption = (value) => {
    const { values, setValues } = this.props;
    setValues({
      ...values,
      options: [...values.options, value],
    });
  };

  updateOptionsArray = (newOptionsArray) => {
    const { values, setValues } = this.props;
    setValues({ ...values, options: newOptionsArray });
  };

  removeOption = (i) => {
    const { values, setValues } = this.props;
    setValues({
      ...values,
      options: [
        ...values.options.slice(0, i),
        ...values.options.slice(i + 1, values.options.length),
      ],
    });
  };

  render() {
    const {
      values, touched, errors, isSubmitting, isValid,
    } = this.props;
    return (
      <CardGutter>
        <CardForm>
          <div className="form-group">
            <Field
              name="questionText"
              type="text"
              placeholder="Texto da nova pergunta"
              className="pergunta"
            />
            {touched.questionText &&
              errors.questionText && <small className="text-danger">{errors.questionText}</small>}
          </div>
          <div className="form-group">
            <Field
              name="tip"
              placeholder="Dica para resposta da pergunta (opcional)"
              component="textarea"
            />
          </div>
          <div className="form-group">
            <Field
              name="reason"
              placeholder="Por que essa pergunta é importante? (opicional)"
              component="textarea"
            />
          </div>
          <div className="form-group text-center">
            <label htmlFor="visible">
              <Field id="visible" name="visible" type="checkbox" checked={values.visible} />{' '}
              <StyledCheckbox checked={values.visible}>
                Visível para o usuário:{' '}
                <span className="checkstatus">{values.visible ? 'SIM' : 'NÃO'}</span>
              </StyledCheckbox>
            </label>
          </div>
          <div className="row text-center">
            <TextoForRadio className="col-xl-12">A resposta da pergunta será:</TextoForRadio>
            <div className="col-xl">
              <label htmlFor="discursive">
                <Field
                  id="discursive"
                  name="type"
                  type="radio"
                  value="DISCURSIVA"
                  checked={values.type === 'DISCURSIVA'}
                />{' '}
                <StyledRadio checked={values.type === 'DISCURSIVA'}>Discursiva</StyledRadio>
              </label>
            </div>
            <div className="col-xl">
              <label htmlFor="choice">
                <Field
                  id="choice"
                  name="type"
                  type="radio"
                  value="ESCOLHA"
                  checked={values.type === 'ESCOLHA'}
                />{' '}
                <StyledRadio checked={values.type === 'ESCOLHA'}>Múltipla Escolha</StyledRadio>
              </label>
            </div>
          </div>
          {values.type === 'ESCOLHA' && (
            <div className="form-group">
              <h6>Opções</h6>
              <div className="form-group">
                <OptionsInput
                  options={values.options}
                  addOption={this.addOption}
                  updateOptionsArray={this.updateOptionsArray}
                  removeOption={this.removeOption}
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <SaveButton disabled={isSubmitting || !isValid}>Salvar</SaveButton>
          </div>
        </CardForm>
      </CardGutter>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: props => ({
    _section: props.sectionId,
    questionText: '',
    tip: '',
    reason: '',
    visible: true,
    type: '',
    options: [],
  }),
  validationSchema: Yup.object().shape({
    questionText: Yup.string()
      .min(4, 'Mínimo de 4 caracteres')
      .required('Texto da pergunta é obrigatório'),
    type: Yup.string().required('Escolha uma das opções acima'),
  }),
  handleSubmit: async (values, { props, setValues, resetForm }) => {
    if (values.type === 'DISCURSIVA') {
      setValues({ ...values, options: [] });
    }

    try {
      await props.createQuestion({
        variables: values,
        update: (store, { data: { createQuestion } }) => {
          const data = store.readQuery({
            query: QuestionQuery.questionsBySection,
            variables: {
              _section: props.sectionId,
            },
          });

          store.writeQuery({
            query: QuestionQuery.questionsBySection,
            variables: {
              _section: props.sectionId,
            },
            data: {
              questions: [...data.questions, createQuestion],
            },
          });
        },
      });
    } catch (err) {
      return errorMessage(err.graphQLErrors[0].message);
    } finally {
      resetForm();
      props.changeCreateFormVisibility();
    }
    // se chegar aqui, alert message + close form
    return successMessage('Pergunta adicionada');
  },
})(NewQuestionForm);

const EnhancedFormWithData = graphql(QuestionQuery.createQuestion, {
  name: 'createQuestion',
})(EnhancedForm);

export default EnhancedFormWithData;

NewQuestionForm.propTypes = {
  values: PropTypes.shape({
    visible: PropTypes.bool,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  touched: PropTypes.shape({
    questionText: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    questionText: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  setValues: PropTypes.func.isRequired,
};
