'use strict';

import axios from 'axios';
import { cleanObj } from 'ufunc';
import R from 'ramda';


// make ajax request to graphqlserver
function fetch ({ field, data, url }) {
  const axiosConfig = {
    url,
    method: 'POST',
    options: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  };

  return axios({ ...axiosConfig, data }).then(response => {
    const success = cleanObj(response.data.data[field]);
    const errors = R.isEempty(success)
    ? [
      { message: 'Request failed' },
      response.data.errors ? { ...response.data.errors } : null
    ]
    : response.data.errors;

    return {
      data: success,
      errors: errors
    };
  });
}


// get the field name from the query/mutaion
function field (query) {
  return query.trim().split(/[ \(]/)[0];
}


// set data on the gql server
export function mutation (url, mutation) {
  const data = {
    query: `mutation { ${mutation} }`
  };

  return fetch({
    url,
    data,
    field :field(mutation)
  });
};


// get data from the gql server
export function query (url, query) {
  const data = {
    query: `query { ${query} }`
  };

  return fetch({
    url,
    data,
    field :field(query)
  });
};
