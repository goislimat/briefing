import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { OptionDiv, DeleteButton, AddOptionButton } from '../../styles';

class OptionsInput extends Component {
  state = {
    newOption: '',
    passedOptions: this.props.options,
  };

  componentDidMount() {
    this.newOption.focus();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ passedOptions: nextProps.options });
  }

  handleChange = async (e, i) => {
    if (typeof i !== 'number') return this.setState({ newOption: e.target.value });

    const { passedOptions } = this.state;
    await this.setState({
      passedOptions: [
        ...passedOptions.slice(0, i),
        e.target.value,
        ...passedOptions.slice(i + 1, passedOptions.length),
      ],
    });

    return this.props.updateOptionsArray(this.state.passedOptions);
  };

  addOptionToArray = (e) => {
    e.preventDefault();

    this.props.addOption(this.state.newOption);
    this.setState({ newOption: '' });
  };

  render() {
    const { newOption, passedOptions } = this.state;

    return (
      <div>
        {passedOptions.map((option, i) => (
          <OptionDiv key={i} className="row d-flex justify-content-between">
            <input
              type="text"
              value={option}
              onChange={e => this.handleChange(e, i)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              className="col-xl"
            />

            <DeleteButton
              className="col-xl-auto option"
              title="Remover Opção"
              onClick={(e) => {
                e.preventDefault();
                this.props.removeOption(i);
              }}
            >
              <i className="fa fa-times" />
            </DeleteButton>
          </OptionDiv>
        ))}
        <OptionDiv className="row d-flex justify-content-between">
          <input
            type="text"
            placeholder={`Texto da opção #${passedOptions.length + 1}`}
            value={newOption}
            onChange={this.handleChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.addOptionToArray(e);
              }
            }}
            className="col-xl"
            ref={(input) => {
              this.newOption = input;
            }}
          />
          <AddOptionButton
            className="col-xl-auto"
            title="Adicionar Opção"
            disabled={newOption.trim() === ''}
            onClick={this.addOptionToArray}
          >
            <i className="fa fa-plus" />
          </AddOptionButton>
        </OptionDiv>
      </div>
    );
  }
}

export default OptionsInput;

OptionsInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  addOption: PropTypes.func.isRequired,
  updateOptionsArray: PropTypes.func.isRequired,
  removeOption: PropTypes.func.isRequired,
};
