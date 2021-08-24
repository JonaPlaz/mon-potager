import React from 'react';
import PropTypes from 'prop-types';

import Field from 'src/components/Field';
import UserCalendar from 'src/components/UserCalendar';
import './connect.scss';

const Connect = ({
  userName,
  password,
  changeFieldValue,
  handleSubmit,
  isAuthentified,
}) => (
  <div className="connect">
    {!isAuthentified
      ? (
        <form
          className="connect-form"
          onSubmit={(event) => {
            event.preventDefault();
            // console.log('soumission du formulaire');
            handleSubmit();
          }}
        >
          <Field
            identifier="userName"
            placeholder="User Name"
            label="Nom d'utilisateur"
            changeField={(identifier, newValue) => {
              changeFieldValue(identifier, newValue);
            }}
            value={userName}
            required
          />
          <Field
            identifier="password"
            placeholder="Mot de passe"
            label="Mot de passe"
            type="password"
            changeField={(identifier, newValue) => {
              changeFieldValue(identifier, newValue);
            }}
            value={password}
            isRequired
          />
          <button
            type="submit"
            className="connect-submit"
          >
            Valider
          </button>
        </form>
      )
      : <UserCalendar />}

  </div>
);
Connect.propTypes = {
//  futur propTypes
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isAuthentified: PropTypes.bool.isRequired,
};

export default Connect;
