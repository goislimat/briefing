import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field, FieldArray } from 'formik';

import { error as errorMessage, success } from '../../alerts';
import { BriefingsList, SaveButton } from './styles';

const ManageBriefingsForm = ({ userId, values }) => (
  <BriefingsList>
    <h4>Briefings que o usuário pode visualizar</h4>
    <Form>
      <FieldArray
        name="options"
        render={() =>
          (values.options && values.options.length > 0
            ? values.options.map((option, i) => (
              <div key={option._id}>
                <label
                  htmlFor={`${userId}-${i}`}
                  className={`row ${option.value ? 'enabled' : ''}`}
                >
                  <Field
                    id={`${userId}-${i}`}
                    name={`options.${i}.value`}
                    type="checkbox"
                    checked={option.value}
                  />
                  <div className="col-xl">{option.title}</div>
                  {option.value && (
                  <div className="col-xl-auto">
                    <i className="fas fa-check" />
                  </div>
                    )}
                </label>
              </div>
              ))
            : 'Sem briefings, no momento')
        }
      />
      <SaveButton>Salvar</SaveButton>
    </Form>
  </BriefingsList>
);

const findIndex = (userBriefings, briefingId) => {
  const indexFound = userBriefings.findIndex(el => el._id === briefingId);
  return indexFound !== -1;
};

const EnhancedForm = withFormik({
  mapPropsToValues: ({ briefings, userBriefings }) => {
    const options = briefings.map(briefing => ({
      _id: briefing._id,
      title: briefing.title,
      value: findIndex(userBriefings, briefing._id),
    }));
    return {
      options,
    };
  },
  handleSubmit: async (values, { props, resetForm, setSubmitting }) => {
    const newBriefings = [];

    values.options.map(option => (option.value ? newBriefings.push(option._id) : newBriefings));

    try {
      await props.manageBriefings(newBriefings);

      resetForm();
      props.toggleBriefingsForm();
      success('Briefings direcionados para o usuário!');
    } catch (err) {
      setSubmitting(false);
      errorMessage(err.graphQLErrors[0].message);
    }
  },
})(ManageBriefingsForm);

export default EnhancedForm;

ManageBriefingsForm.propTypes = {
  userId: PropTypes.string.isRequired,
  values: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.bool,
    })),
  }).isRequired,
};
