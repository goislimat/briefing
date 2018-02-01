import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionsInput extends Component {
  state = {
    newOption: '',
    passedOptions: this.props.options,
  };

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
          <div key={i} className="form-group">
            <input type="text" value={option} onChange={e => this.handleChange(e, i)} />
          </div>
        ))}
        <div className="form-group">
          <input
            type="text"
            placeholder={`Texto da opção #${passedOptions.length + 1}`}
            value={newOption}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <button onClick={this.addOptionToArray}>Add</button>
        </div>
      </div>
    );
  }
}

export default OptionsInput;

OptionsInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  addOption: PropTypes.func.isRequired,
  updateOptionsArray: PropTypes.func.isRequired,
};
