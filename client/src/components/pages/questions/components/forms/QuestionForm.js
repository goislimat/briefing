import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field, FieldArray } from 'formik';
import { compose, graphql } from 'react-apollo';

import { error as errorMessage, success } from '../../../../alerts';
import QuestionQuery from '../../../../../queries/Question';
import SectionQuery from '../../../../../queries/Section';
import {
  CardFormInfo,
  MoveButton,
  BackButton,
  DeleteButton,
  SaveButton,
  StyledCheckbox,
  StyledRadio,
  OptionDiv,
  AddOptionButton,
} from '../../styles';

const QuestionForm = ({
  mode,
  onModeChange,
  values,
  touched,
  errors,
  isSubmitting,
  isValid,
  setTouched,
}) => (
  <Form>
    <CardFormInfo className="row">
      <pre>{JSON.stringify(values)}</pre>
      <div className="col-xl">
        <div>
          <small>Pergunta:</small>
          <Field
            name="questionText"
            component="textarea"
            rows="2"
            placeholder="Qual a sua pergunta?"
            className="col-xl-12 question"
          />
          {touched.questionText &&
            errors.questionText && <small className="text-danger">{errors.questionText}</small>}
        </div>
        <div>
          <small>Dica:</small>
          <Field
            name="tip"
            component="textarea"
            rows="4"
            placeholder="Escreva algo para ajudar o usuário a responder essa pergunta (opcional)"
            className="col-xl-12"
          />
        </div>
        <div>
          <small>Motivo:</small>
          <Field
            name="reason"
            component="textarea"
            rows="4"
            placeholder="Explique para o usuário por que essa pergunta é importante (opcional)"
            className="col-xl-12"
          />
        </div>
        <div>
          <small>Visibilidade:</small>
          <br />
          <label htmlFor="visible">
            <Field
              id="visible"
              name="visible"
              type="checkbox"
              checked={values.visible}
              onClick={() => setTouched({ visible: true })}
            />{' '}
            <StyledCheckbox checked={values.visible}>
              Visível para o usuário:{' '}
              <span className="checkstatus">{values.visible ? 'SIM' : 'NÃO'}</span>
            </StyledCheckbox>
          </label>
        </div>
        <div className="row">
          <small className="col-xl-12">Tipo de resposta:</small>
          <br />
          <div className="col-xl-6">
            <label htmlFor="choice">
              <Field
                id="choice"
                name="type"
                type="radio"
                value="ESCOLHA"
                checked={values.type === 'ESCOLHA'}
                onClick={() => setTouched({ type: true })}
              />{' '}
              <StyledRadio checked={values.type === 'ESCOLHA'}>Múltipla Escolha</StyledRadio>
            </label>
          </div>
          <div className="col-xl-6">
            <label htmlFor="discursive">
              <Field
                id="discursive"
                name="type"
                type="radio"
                value="DISCURSIVA"
                checked={values.type === 'DISCURSIVA'}
                onClick={() => setTouched({ type: true })}
              />{' '}
              <StyledRadio checked={values.type === 'DISCURSIVA'}>Discursiva</StyledRadio>
            </label>
          </div>
        </div>
        {values.type === 'ESCOLHA' && (
          <div>
            <h6>Opções</h6>
            {errors.options && <small className="text-danger">{errors.options}</small>}
            <FieldArray
              name="options"
              render={helpers => (
                <div>
                  {values.options &&
                    values.options.length > 0 &&
                    values.options.map((option, i) => (
                      <OptionDiv key={i} className="row d-flex justify-content-between">
                        <Field
                          name={`options.${i}`}
                          type="text"
                          placeholder={`Texto da opção #${i + 1}`}
                          className="col-xl"
                        />
                        <DeleteButton
                          className="col-xl-auto option"
                          type="button"
                          title="Remover Opção"
                          onClick={() => helpers.remove(i)}
                        >
                          <i className="fa fa-times" />
                        </DeleteButton>
                      </OptionDiv>
                    ))}
                  <OptionDiv className="row">
                    <AddOptionButton
                      className="col-xl-6"
                      type="button"
                      onClick={() => helpers.push('')}
                      disabled={
                        values.options.length > 0 &&
                        values.options[values.options.length - 1].trim() === ''
                      }
                    >
                      Nova Opção
                    </AddOptionButton>
                  </OptionDiv>
                </div>
              )}
            />
          </div>
        )}
        <SaveButton disabled={!isValid || isSubmitting} title="Preencha o formulário">
          Salvar
        </SaveButton>
      </div>

      {mode === 'EDIT' && (
        <div className="col-xl-auto d-flex flex-column">
          <MoveButton className="move">
            <i className="fas fa-bars" />
          </MoveButton>
          <BackButton
            title="Voltar para exibição"
            onClick={(e) => {
              e.preventDefault();
              onModeChange('SHOW');
            }}
          >
            <i className="fas fa-backward" />
          </BackButton>
          <DeleteButton>
            <i className="fas fa-times" />
          </DeleteButton>
        </div>
      )}
    </CardFormInfo>
  </Form>
);

const EnhancedForm = withFormik({
  mapPropsToValues: ({ question }) => {
    if (question) return question;
    return {
      questionText: '',
      tip: '',
      reason: '',
      visible: true,
      type: '',
      options: [],
    };
  },
  isInitialValid: ({ mode }) => mode === 'EDIT',
  validate: (values) => {
    const errors = {};

    if (!values.questionText) {
      errors.questionText = 'Pergunta é obrigatória';
    } else if (values.questionText.length < 4) {
      errors.questionText = 'Mínimo de 4 caracteres';
    }
    if (!values.type) {
      errors.type = 'Tipo é obrigatório';
    }
    if (values.type === 'ESCOLHA' && values.options.length === 0) {
      errors.options = 'Múltipla Escolha deve fornecer ao menos 1 opção de resposta';
    }

    return errors;
  },
  handleSubmit: async (values, {
    props, setValues, setSubmitting, resetForm,
  }) => {
    if (props.mode === 'CREATE') {
      // faz procedimento de criação de pergunta
      if (values.type === 'DISCURSIVA') setValues({ ...values, options: [] });

      try {
        await props.createQuestion({
          variables: {
            questionText: values.questionText,
            type: values.type,
            _section: props.sectionId,
            reason: values.reason,
            tip: values.tip,
            visible: values.visible,
            options: values.options,
          },
          update: (store, { data: { createQuestion } }) => {
            const data = store.readQuery({
              query: SectionQuery.section,
              variables: {
                _id: props.sectionId,
              },
            });

            data.section.questions.push(createQuestion);

            store.writeQuery({
              query: SectionQuery.section,
              variables: {
                _id: props.sectionId,
              },
              data,
            });
          },
        });
      } catch (err) {
        setSubmitting(false);
        return errorMessage(err.graphQLErrors[0].message);
      }

      resetForm();
      props.handleCreateFormVisibility();
      return success('Pergunta adicionada!');
    }
    // faz procedimento de edição de pergunta

  },
})(QuestionForm);

const EnhancedFormWithData = compose(graphql(QuestionQuery.createQuestion, { name: 'createQuestion' }))(EnhancedForm);

export default EnhancedFormWithData;

QuestionForm.propTypes = {
  values: PropTypes.shape({
    questionText: PropTypes.string,
    tip: PropTypes.string,
    reason: PropTypes.string,
    visible: PropTypes.bool,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onModeChange: PropTypes.func,
  mode: PropTypes.string.isRequired,
  touched: PropTypes.shape({
    questionText: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    questionText: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  setTouched: PropTypes.func.isRequired,
};

QuestionForm.defaultProps = {
  onModeChange: () => {},
};
