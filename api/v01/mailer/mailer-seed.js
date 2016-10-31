'use strict';

import R from 'ramda';
import rethinkdbdash from 'rethinkdbdash';
import { insert } from '../../../../rethinkdb-utils';
import { mailersMock } from './mailer-mock';
import development from '../../../server/env/development-env';

const TABLE = 'mail';
const dbConfig = development.rethinkdb;
const r = rethinkdbdash(dbConfig);


function insertMock () {
  function callback (resolve) {
    return R.curry((response) => {
      if (response.errors) return response.errors;
      console.log(response);
      console.log('Mailers mocks save to rethinkdb');
    });
  }

  return insert({
    dbName   : 'mailer',
    tableName: TABLE,
    data     : mailersMock,
    db       : r,
    fn       : callback,
    indexes  : ['from', 'to', 'service']
  });
}


export default function seedMailer () {
  return new Promise((resolve, reject) => {
    r.tableList()
      .contains(TABLE)
      .run()
      .then(response => {
        if (response) {
          r.tableDrop(TABLE)
            .run()
            .then(() => {
              resolve(insertMock());
            })
            .catch(error => {
              console.log(error);
              reject(error);
            });
        } else {
          resolve(insertMock());
        }
      });
  })
  .then(() => {
    r.close();
  });
}
