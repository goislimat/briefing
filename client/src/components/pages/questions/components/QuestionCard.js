import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardGutter, Card, Button } from './styles';

import QuestionForm from './QuestionForm';

class QuestionCard extends Component {
  state = {
    isExpanded: this.props.mode === 'CREATE',
    mode: this.props.mode,
  };

  handleExpandedChange = () => this.setState({ isExpanded: !this.state.isExpanded });

  handleModeChange = mode => this.setState({ mode });

  render() {
    const { question } = this.props;
    const { mode } = this.state;
    const { isExpanded } = this.state;

    return (
      <CardGutter data-id={question._id || ''} className="col-xl-6">
        <Card>
          {isExpanded ? (
            <QuestionForm
              mode={mode}
              question={question}
              isExpanded={isExpanded}
              onModeChange={this.handleModeChange}
            />
          ) : (
            <div className="row">
              <p className="col-xl question">{question.questionText}</p>
              <div className="col-xl-auto">
                <Button className="move">
                  <i className="fas fa-bars" />
                </Button>
              </div>
            </div>
          )}
          {mode === 'SHOW' && (
            <div>
              <Button className="more-info" onClick={this.handleExpandedChange}>
                {isExpanded ? 'Menos' : 'Mais'}
              </Button>
            </div>
          )}
        </Card>
      </CardGutter>
    );
  }
}

export default QuestionCard;

QuestionCard.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string,
    questionText: PropTypes.string,
  }),
  mode: PropTypes.string.isRequired,
};

QuestionCard.defaultProps = {
  question: {},
};
