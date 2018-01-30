import casual from 'casual-browserify';
import times from 'lodash/times';

times(10, () => ({
  id: casual.integer(1, 1000),
  order: casual.integer(1, 100),
  questionText: casual.sentence,
  reason: casual.coin_flip ? casual.sentences(3) : null,
  required: casual.coin_flip,
  tip: casual.coin_flip ? casual.sentences(3) : null,
  type: casual.integer(1, 2),
  visible: casual.coin_flip,
}));

export default {
  questions: times(10, () => ({
    id: casual.integer(1, 1000),
    order: casual.integer(1, 100),
    questionText: casual.sentence,
    reason: casual.coin_flip ? casual.sentences(3) : null,
    required: casual.coin_flip,
    tip: casual.coin_flip ? casual.sentences(3) : null,
    type: casual.integer(1, 2),
    visible: casual.coin_flip,
  })),
};
