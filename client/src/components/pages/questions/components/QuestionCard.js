import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardGutter, Card, Controls } from './styles';

class QuestionCard extends Component {
  state = {
    isExpanded: false,
  };

  handleExpandedChange = () => this.setState({ isExpanded: !this.state.isExpanded });

  render() {
    const { questionText } = this.props.question;
    const { isExpanded } = this.state;

    return (
      <CardGutter
        className={`${isExpanded ? 'col-xl-12' : 'col-xl-6'} row`}
        onClick={this.handleExpandedChange}
      >
        <Card className="col-xl-9">{questionText}</Card>
        <Controls className="col-xl-3">
          <div>
            <i className="fas fa-arrows-alt" />
          </div>
          <div>
            <i className="fas fa-info" />
          </div>
        </Controls>
      </CardGutter>
    );
  }
}

export default QuestionCard;

QuestionCard.propTypes = {
  question: PropTypes.shape({
    questionText: PropTypes.string,
  }).isRequired,
};
