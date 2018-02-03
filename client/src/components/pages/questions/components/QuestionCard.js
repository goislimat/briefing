import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardGutter, Card, Controls, Button } from './styles';

class QuestionCard extends Component {
  state = {
    isExpanded: false,
  };

  handleExpandedChange = () => this.setState({ isExpanded: !this.state.isExpanded });

  render() {
    const { questionText } = this.props.question;
    const { isExpanded } = this.state;

    return (
      <CardGutter className={`${isExpanded ? 'col-xl-12' : 'col-xl-6'}`}>
        <div className="row">
          <Card className="col-xl">
            <span className="question">{questionText}</span>
          </Card>
          <Controls className="col-xl-auto d-flex justify-content-end align-items-end flex-column">
            <div className="mb-auto">
              <Button className="move">
                <i className="fas fa-arrows-alt" />
              </Button>
            </div>
            <div className="">
              <Button className="more-info" onClick={this.handleExpandedChange}>
                <i className="fas fa-info" />
              </Button>
            </div>
          </Controls>
        </div>
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
