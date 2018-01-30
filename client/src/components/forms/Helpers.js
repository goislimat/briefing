import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

export const CustomInlineField = ({
  label, touched, error, className, ...rest
}) => (
  <div className="col-xl-12 form-group">
    <label htmlFor="email" className="w100 row d-flex align-items-center">
      <div className="col-xl-3 text-right">{label}</div>
      <div className="col-xl-9">
        <Field {...rest} className={`form-control ${className}`} />
        {touched &&
          error && (
            <div>
              <small className="text-danger">{error}</small>
            </div>
          )}
      </div>
    </label>
  </div>
);

CustomInlineField.propTypes = {
  label: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
};

CustomInlineField.defaultProps = {
  touched: false,
  error: '',
  className: '',
};

export const CustomField = ({
  label, touched, error, ...rest
}) => (
  <div className="col-xl-12 form-group">
    <label htmlFor="email" className="w100 row d-flex align-items-center">
      {label}
      <Field {...rest} className="form-control" />
      {touched &&
        error && (
          <div>
            <small className="text-danger">{error}</small>
          </div>
        )}
    </label>
  </div>
);

CustomField.propTypes = {
  label: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.string,
};

CustomField.defaultProps = {
  touched: false,
  error: '',
};
