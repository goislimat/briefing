import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardGutter, Card, MoveButton, MoreInfoButton } from './styles';

import ExpandedQuestionCard from './ExpandedQuestionCard';

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
            <ExpandedQuestionCard
              mode={mode}
              questionId={question._id}
              onModeChange={this.handleModeChange}
            />
          ) : (
            <div className="row">
              <p className="col-xl question">{question.questionText}</p>
              <div className="col-xl-auto">
                <MoveButton className="move">
                  <i className="fas fa-bars" />
                </MoveButton>
              </div>
            </div>
          )}
          {mode === 'SHOW' && (
            <div>
              <MoreInfoButton onClick={this.handleExpandedChange}>
                {isExpanded ? 'Menos' : 'Mais'}
              </MoreInfoButton>
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
