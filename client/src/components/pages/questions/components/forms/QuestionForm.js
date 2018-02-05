import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';

import {
  CardFormInfo,
  MoveButton,
  BackButton,
  DeleteButton,
  SaveButton,
  StyledCheckbox,
  StyledRadio,
} from '../../styles';
import OptionsInput from './OptionsInput';

class QuestionForm extends Component {
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
      mode,
      onModeChange,
      values,
      touched,
      errors,
      isSubmitting,
      isValid,
      setTouched,
    } = this.props;

    return (
      <Form>
        <CardFormInfo className="row">
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
              <div className="">
                <h6>Opções</h6>
                {errors.options && <small className="text-danger">{errors.options}</small>}
                <div>
                  <OptionsInput
                    options={values.options}
                    addOption={this.addOption}
                    updateOptionsArray={this.updateOptionsArray}
                    removeOption={this.removeOption}
                  />
                </div>
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
  }
}

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
  handleSubmit: (values, { props }) => {
    // based on mode execute custom operation
  },
})(QuestionForm);

export default EnhancedForm;

QuestionForm.propTypes = {
  values: PropTypes.shape({
    questionText: PropTypes.string,
    tip: PropTypes.string,
    reason: PropTypes.string,
    visible: PropTypes.bool,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setValues: PropTypes.func.isRequired,
  onModeChange: PropTypes.func,
  mode: PropTypes.string.isRequired,
};

QuestionForm.defaultProps = {
  onModeChange: () => {},
};
