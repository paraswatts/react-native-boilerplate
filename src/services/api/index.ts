import axios from 'axios';
import pickBy from "lodash/pickBy";
const BASE_URL = 'https://js2qft0nfa.execute-api.us-east-1.amazonaws.com/stage/'

export const API = {
  USER_EVENTS: `event/users/`,
  EVENTS: `event/`,
  UPLOAD_IMAGE: `upload/`,
  COMMENTS: `comment/`,
};
const defaultHeader = {
  headers: {
    "Content-Type": "application/json"
  }
};

const instance = axios.create({
  baseURL: BASE_URL,
  defaultHeader
});

const requestWithoutAuth = axios.create({
  baseURL: BASE_URL,
  defaultHeader
});

axios.interceptors.request.use(request => {
  return request
})

axios.interceptors.response.use(response => {
  return response
})

export const postRequestNoAuth = ({
  API = "",
  DATA = {},
  HEADER = {},
  PAYLOAD = {}
}) => {
  return new Promise((resolve, reject) => {
    requestWithoutAuth
      .post(API, pickBy(DATA, val => ![""].includes(val)), {
        ...(PAYLOAD ? PAYLOAD : { ...defaultHeader.headers, ...HEADER })
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        resolve(error.response);
      });
  });
};

export const updateAuthToken = (token = '') => {
  instance.defaults.headers = {
    ...instance.defaults.headers,
    ...{ Authorization: token }
  };
};

export const postRequest = ({ API = "", DATA = {}, headers = {}, PAYLOAD = {} }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(apiWithAuth(API), DATA,
        {
          headers: {
            ...defaultHeader.headers,
            ...headers,
          }
        })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        resolve(error.response);
      });
  });
};

export const getRequest = ({
  API = "",
  headers = {},
  params = {},
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(apiWithAuth(API), {
        ...defaultHeader.headers,
        ...(params && pickBy(params, val => ![""].includes(val))),
        ...(headers && pickBy(headers, val => ![""].includes(val)))
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        resolve(error.response);
      });
  });
};

export const openGetRequest = ({
  API = "",
  headers = {},
  params = {},
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(API)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        resolve(error.response);
      });
  });
};


export const postRequestWithParams = ({
  API = "",
  headers = {},
  params = {},
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(apiWithAuth(API), {
        ...defaultHeader.headers,
        ...(params && pickBy(params, val => ![""].includes(val))),
        ...(headers && pickBy(headers, val => ![""].includes(val)))
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        resolve(error.response);
      });
  });
};

export const putRequest = ({
  API = "",
  DATA = {},
  PAYLOAD = {},
  HEADER = {}
}) => {
  return new Promise((resolve, reject) => {
    instance
      .put(apiWithAuth(API), DATA, {
        ...(PAYLOAD
          ? pickBy(DATA, val => ![""].includes(val))
          : { ...defaultHeader.headers, ...HEADER })
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        resolve(error.response);
      });
  });
};

export const deleteRequest = ({
  API = "",
  DATA = {},
  PAYLOAD,
  HEADER = {}
}) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(apiWithAuth(API), {
        headers:
        {
          ...(PAYLOAD
            ? pickBy(DATA, val => ![""].includes(val))
            : { ...defaultHeader.headers, ...HEADER })
        }
        , data: DATA
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        resolve(error.response);
      });
  });
};

export const patchRequest = ({ API = "", DATA = {}, PAYLOAD, HEADER = {} }) => {
  return new Promise((resolve, reject) => {
    instance
      .patch(apiWithAuth(API), DATA, {
        ...(PAYLOAD ? PAYLOAD : { ...defaultHeader.headers, ...HEADER })
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        resolve(error.response);
      });
  });
};

export const apiWithAuth = api => {
  return api;
};

export default instance;

