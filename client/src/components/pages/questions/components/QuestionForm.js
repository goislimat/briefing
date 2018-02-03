import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../../../styles/Loader';
import { FieldRow, Button, StyledCheckbox, TextForRadio, StyledRadio } from './styles';
import OptionsInput from '../OptionsInput';

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
      data: { loading }, mode, isExpanded, onModeChange, values,
    } = this.props;

    if (loading) return <Loader />;
    return (
      <Form>
        <FieldRow className="row">
          <div className="col-xl">
            <div className="form-group">
              <Field
                name="questionText"
                component="textarea"
                rows="2"
                placeholder="Qual a sua pergunta?"
                className="col-xl-12 pergunta"
                disabled={mode === 'SHOW'}
              />
            </div>
            {isExpanded && (
              <div>
                <div className="form-group">
                  <Field
                    name="tip"
                    component="textarea"
                    rows="3"
                    placeholder="Escreva algo para ajudar o usuário a responder essa pergunta (opcional)"
                    className="col-xl-12"
                    disabled={mode === 'SHOW'}
                  />
                </div>
                <div className="form-group">
                  <Field
                    name="reason"
                    component="textarea"
                    rows="3"
                    placeholder="Explique para o usuário por que essa pergunta é importante (opcional)"
                    className="col-xl-12"
                    disabled={mode === 'SHOW'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="visible">
                    <Field
                      id="visible"
                      name="visible"
                      type="checkbox"
                      checked={values.visible}
                      disabled={mode === 'SHOW'}
                    />{' '}
                    <StyledCheckbox checked={values.visible} disabled={mode === 'SHOW'}>
                      Visível para o usuário:{' '}
                      <span className="checkstatus">{values.visible ? 'SIM' : 'NÃO'}</span>
                    </StyledCheckbox>
                  </label>
                </div>
                <div className="row">
                  <TextForRadio className="col-xl-12">A resposta da pergunta será:</TextForRadio>
                  <div className="col-xl">
                    <label htmlFor="choice">
                      <Field
                        id="choice"
                        name="type"
                        type="radio"
                        value="ESCOLHA"
                        checked={values.type === 'ESCOLHA'}
                        disabled={mode === 'SHOW'}
                      />{' '}
                      <StyledRadio checked={values.type === 'ESCOLHA'} disabled={mode === 'SHOW'}>
                        Múltipla Escolha
                      </StyledRadio>
                    </label>
                  </div>
                  <div className="col-xl">
                    <label htmlFor="discursive">
                      <Field
                        id="discursive"
                        name="type"
                        type="radio"
                        value="DISCURSIVA"
                        checked={values.type === 'DISCURSIVA'}
                        disabled={mode === 'SHOW'}
                      />{' '}
                      <StyledRadio
                        checked={values.type === 'DISCURSIVA'}
                        disabled={mode === 'SHOW'}
                      >
                        Discursiva
                      </StyledRadio>
                    </label>
                  </div>
                </div>
                {values.type === 'ESCOLHA' && (
                  <div className="">
                    <h6>Opções</h6>
                    <div className="form-group">
                      <OptionsInput
                        options={values.options}
                        addOption={this.addOption}
                        updateOptionsArray={this.updateOptionsArray}
                        removeOption={this.removeOption}
                        mode={mode}
                      />
                    </div>
                  </div>
                )}
                {mode !== 'SHOW' && <button>Salvar</button>}
              </div>
            )}
          </div>

          {/* se entrar no modo de criação, não tem esse cara */}
          <div className="col-xl-auto d-flex flex-column">
            <Button className="move">
              <i className="fas fa-bars" />
            </Button>
            <Button className="edit" onClick={() => onModeChange('EDIT')}>
              <i className="fas fa-edit" />
            </Button>
            <Button className="delete">
              <i className="fas fa-times" />
            </Button>
          </div>
        </FieldRow>
      </Form>
    );
  }
}

const EnhancedForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ question: ownQuestion, data: { loading, question } }) => {
    if (loading) return {};
    return {
      questionText: ownQuestion ? question.questionText : '',
      tip: ownQuestion ? question.tip : '',
      reason: ownQuestion ? question.reason : '',
      visible: ownQuestion ? question.visible : true,
      type: ownQuestion ? question.type : '',
      options: ownQuestion ? question.options : [],
    };
  },
})(QuestionForm);

const QUESTION_QUERY = gql`
  query question($_id: String!) {
    question(_id: $_id) {
      _id
      order
      questionText
      reason
      tip
      type
      visible
      options
    }
  }
`;

const EnhancedFormWithData = graphql(QUESTION_QUERY, {
  skip: props => !props.question,
  options: ({ question }) => ({
    variables: {
      _id: question._id,
    },
  }),
})(EnhancedForm);

export default EnhancedFormWithData;
