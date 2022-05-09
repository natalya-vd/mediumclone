import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggenIn: null, // true, false, null - когда
  // не отправляли запрос на бэк чтобы узнать залогирован пользователь или нет
};

// Когда задаем мутации и типы таким образом, а не пишем
// названия в качестве строк, то потом легде менять код и дебажить
export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
};

export const gettersTypes = {
  currentUser: '[auth] currentUser',
  isLoggenIn: '[auth] isLoggenIn',
  isAnonymous: '[auth] isAnonymous',
};

const getters = {
  [gettersTypes.currentUser]: (state) => state.currentUser,
  [gettersTypes.isLoggenIn]: (state) => Boolean(state.isLoggenIn),
  [gettersTypes.isAnonymous]: (state) => state.isLoggenIn === false,
};

const mutations = {
  // [mutationTypes.registerStart] - такая запись для того чтобы
  // получить имя из объекта по ключу. Если без скобок, то будет ошибка
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggenIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggenIn = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.isLoggenIn = true;
    state.currentUser = payload;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggenIn = false;
    state.currentUser = null;
  },
};

const actions = {
  [actionTypes.register]({commit}, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.registerStart);

      authApi
        .register(credentials)
        .then((response) => {
          commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user); // Передаем далее в промис
        })
        .catch((result) => {
          commit(mutationTypes.registerFailure, result.response.data.errors);
          console.log(result);
        });
    });
  },

  [actionTypes.login]({commit}, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.loginStart);

      authApi
        .login(credentials)
        .then((response) => {
          console.log(response);
          commit(mutationTypes.loginSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user); // Передаем далее в промис
        })
        .catch((result) => {
          commit(mutationTypes.loginFailure, result.response.data.errors);
          console.log(result);
        });
    });
  },

  [actionTypes.getCurrentUser]({commit}) {
    return new Promise((resolve) => {
      commit(mutationTypes.getCurrentUserStart);

      authApi
        .getCurrentUser()
        .then((response) => {
          console.log(response);
          commit(mutationTypes.getCurrentUserSuccess, response.data.user);
          resolve(response.data.user); // Передаем далее в промис
        })
        .catch(() => {
          commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
