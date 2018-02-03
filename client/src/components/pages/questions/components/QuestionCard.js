import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardGutter, Card, Controls, Button } from './styles';

class QuestionCard extends Component {
  state = {
    isExpanded: false,
  };

  handleExpandedChange = () => this.setState({ isExpanded: !this.state.isExpanded });

  render() {
    const { _id, questionText } = this.props.question;
    const { isExpanded } = this.state;

    return (
      <CardGutter data-id={_id} className="col-xl-6">
        <Card className="">
          <div className="row">
            <p className="question col-xl">{questionText}</p>
            <Button className="move col-xl-auto">
              <i className="fas fa-bars" />
            </Button>
          </div>
          <div>
            <Button className="more-info">
              <i className="fas fa-angle-double-down" />
            </Button>
          </div>
        </Card>
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
