import { useState } from 'react';
import firebase from './base';

const ENV = process.env.NODE_ENV || 'development';
const HOST =
  ENV === 'development'
    ? 'http://localhost:8080'
    : 'http://api.residents.me';

const request = async (route, method, data, requestOptions) => {
  const { auth = true, host = HOST } = requestOptions || {};

  let json = null;

  const headers = new Headers();
  if (method === 'POST') {
    headers.append('Content-Type', 'application/json');
  }

  if (auth) {
    try {
      const authToken = await firebase.user().getIdToken(true);
      headers.append('Authorization', authToken);
    } catch (err) {
      return { status: 'fail', error: 'Not authenticated' };
    }
  }

  const options = {
    method,
    headers,
    credentials: 'include',
  };

  if (method === 'POST') {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${host}${route}`, options);
    try {
      const text = await res.text();
      json = JSON.parse(text);
    } catch (err) {
      json = { status: 'fail', error: `Request returned invalid JSON: ${err}` };
    }
  } catch (err) {
    json = { status: 'fail', error: `Failed to make request: ${err}` };
  }

  console.log(`gotJson | ${route} | ${json.status}`);
  return json;
};

export const useRequest = (defaults) => {
  const {
    loading: defaultLoading = false,
    error: defaultError = null,
  } = defaults;
  const [loading, setLoading] = useState(defaultLoading);
  const [error, setError] = useState(defaultError);
  const [requestData, setRequestData] = useState(null);

  const makeRequest = async (route, method, data, options) => {
    setLoading(true);
    const res = await request(route, method, data, options);
    if (res.error) {
      setError(res.error);
    } else {
      setError(null);
      setRequestData(res);
    }
    setLoading(false);
    return res;
  };

  return [loading, error, requestData, makeRequest];
};

export const get = (route, opts) => request(route, 'GET', null, opts);
export const post = (route, data, opts) => request(route, 'POST', data, opts);
