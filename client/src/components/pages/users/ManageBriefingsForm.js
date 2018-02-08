import React from 'react';
import { withFormik, Form, Field, FieldArray } from 'formik';

import { BriefingsList, SaveButton } from './styles';

const ManageBriefingsForm = ({ userId, values }) => (
  <BriefingsList>
    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
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
  handleSubmit: (values) => {
    const newBriefings = [];

    values.options.map(option => (option.value ? newBriefings.push(option._id) : newBriefings));

    console.log('newBriefings', newBriefings);
  },
})(ManageBriefingsForm);

export default EnhancedForm;
