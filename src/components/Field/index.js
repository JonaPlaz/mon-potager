import React from 'react';
import PropTypes from 'prop-types';

import './field.scss';

/**
 * A field to be used inside a form : label and input
 */
const Field = ({
  identifier,
  placeholder,
  label,
  type,
  value,
  changeField,
}) => {
  const handleChange = (event) => {
    // const { value: inputValue, name } = event.target;
    // c'est équivalent à :
    const inputValue = event.target.value;
    const name = event.target.name;
    if (event.target.name === 'username') {
      if (event.target.value === '' || event.target.value === null) {
        changeField({
          usernameError: true,
        });
      }
      else {
        changeField({
          usernameError: false,
          username: event.target.value,
        });
      }
    }

    if (event.target.name === 'password') {
      if (event.target.value === '' || event.target.value === null) {
        changeField({
          passwordError: true,
        });
      }
      else {
        changeField({
          passwordError: false,
          password: event.target.value,
        });
      }
    }

    if (event.target.name === 'confirmPassword') {
      if (event.target.value !== event.target.value.password) {
        changeField({
          confirmPasswordError: true,
        });
      }
      else {
        changeField({
          confirmPasswordError: false,
          confirmPassword: event.target.value,
        });
      }
    }

    if (event.target.name === 'email') {
      if (event.target.value === '' || event.target.value === null) {
        changeField({
          emailError: true,
        });
      }
      else {
        changeField({
          emailError: false,
          email: event.target.value,
        });
      }
    }

    changeField(name, inputValue);
  };

  return (
    <div className="field">
      <input
        className="input"
        id={identifier}
        placeholder={placeholder}
        name={identifier}
        type={type}
        value={value}
        onChange={handleChange}
      />
      <label
        className="label"
        htmlFor={identifier}
      >
        {label}
      </label>
    </div>
  );
};

Field.propTypes = {
  /** identifier for the input : used both for name and id => must be unique */
  identifier: PropTypes.string.isRequired,
  /** text used as placeholder */
  placeholder: PropTypes.string.isRequired,
  /** text used as label */
  label: PropTypes.string.isRequired,
  /** type of the input */
  type: PropTypes.string,
  /** text used as value for the input */
  value: PropTypes.string,
  /** called when onChange event is received by the input, two parameters :
   * - identifier
   * - new value
   */
  changeField: PropTypes.func.isRequired,
};

Field.defaultProps = {
  type: 'text',
  value: '',
};

export default Field;
