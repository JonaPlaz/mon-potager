import axios from 'axios';

import {
  SUBMIT_LOGIN,
  saveUserData,
  SUBMIT_REGISTER,
  saveUserRegister,
} from '../actions/auth';
import {
  FETCH_USER_PLANTS, fetchUserPlants, saveUserPlants
} from '../actions/userCalendar';

const authMiddleware = (store) => (next) => (action) => {
  // console.log('on est dans le middleware, action');
  switch (action.type) {
    case SUBMIT_LOGIN: {
      // console.log('on va envoyer la requête');

      // on va piocher dans le state les infos nécessaires
      const { userName, password } = store.getState().auth;

      axios.post(
        // URL
        'http://ec2-54-89-4-11.compute-1.amazonaws.com/projet-mon-potager-back/public/wp-json/wp/v2/plante?_embed=true&per_page=100',
        // paramètres
        {
          username: userName,
          password: password,
        },
      )
        .then((response) => {
          const newAction = saveUserData(
            response.data.token,
            response.data.user_display_name,
            response.data.logged,
          );
          store.dispatch(newAction);
          store.dispatch(fetchUserPlants());
        })
        .catch((error) => {
          // TODO message d'erreur
          alert('failed connection');
          console.log(error);
        });
      break;
    }
    case FETCH_USER_PLANTS:

      // on envoie le token : dans le header Authorization, en précisant le mot
      // "Bearer" avant le token
      axios.post(
        // URL
        'http://ec2-54-89-4-11.compute-1.amazonaws.com/projet-mon-potager-back/public/wp-json/jwt-auth/v1/plantation-save',
        // données
        {},
        // options, notamment les headers
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        },
      )
        .then((response) => {
          // console.log(response);
          store.dispatch(saveUserPlants(response.data.userPlants));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SUBMIT_REGISTER: {
      // console.log('on va envoyer la requête');

      // on va piocher dans le state les infos nécessaires
      const {
        username,
        password,
        confirmPassword,
        email,
        region,
      } = store.getState().register;

      axios.post(
        // URL
        'http://ec2-54-89-4-11.compute-1.amazonaws.com/projet-mon-potager-back/public/wp-json/monpotager/v1/inscription',
        // paramètres
        {
          username: username,
          password: password,
          confirmPassword: confirmPassword,
          email: email,
          region: region,
        },
      )
        .then((response) => {
          // console.log(response);
          const newAction = saveUserRegister(
            response.data.token,
            console.log(response.data.token),
            response.data.user_display_name,
            response.data.signed,
          );
          store.dispatch(newAction);
        })
        .catch((error) => {
          // TODO message d'erreur
          alert('failed register');
          console.log(error);
        });
      break;
    }
    default:
  }
  next(action);
};

export default authMiddleware;
