import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';

import { CardGutter, CardForm, SaveButton, StyledCheckbox, StyledRadio } from './styles';
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
    const { values } = this.props;
    return (
      <CardGutter>
        <CardForm>
          <pre>{JSON.stringify(values)}</pre>
          <div className="form-group">
            <Field
              name="questionText"
              type="text"
              placeholder="Texto da nova pergunta"
              className="pergunta"
            />
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
            <SaveButton>Salvar</SaveButton>
          </div>
        </CardForm>
      </CardGutter>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    questionText: '',
    tip: '',
    reason: '',
    visible: true,
    type: '',
    options: [],
  }),
  handleSubmit: (values) => {
    console.log(values);
  },
})(NewQuestionForm);

NewQuestionForm.propTypes = {
  values: PropTypes.shape({
    visible: PropTypes.bool,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setValues: PropTypes.func.isRequired,
};
