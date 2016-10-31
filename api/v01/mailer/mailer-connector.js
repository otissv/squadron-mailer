import rethinkdbdash from 'rethinkdbdash';
import nodemailer from 'nodemailer';
import { insert } from '../../../../rethinkdb-utils';
import { promise } from '../../../../squadron-utils';
import ERROR from '../error/error';
import { MAIL } from '../../../secret';
import { mailerValidation } from './mailer-model';
import R from 'ramda';
import { env } from '../../../server/env/environment.js';


const dbConfig = env().rethinkdb;
const r = rethinkdbdash(dbConfig);

const TABLE = 'mail';

export default class Mailer {

  find ({ args }) {
    return promise((resolve, reject) => {
      r.table(TABLE)
        .run()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }


  findByFrom ({ args }) {
    const from = args.from;
    const index = { index : 'from' };

    return promise((resolve, reject) => {
      r.table(TABLE)
        .getAll(from, index)
        .run()
        .then(response => {
          resolve(response[0]);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }


  findById ({ args }) {
    let obj = args || query;
    let getDocuments;

    if (Array.isArray(obj)) {
      getDocuments = r.table(TABLE).getAll(...obj.map(i => i.id));
    } else {
      getDocuments = r.table(TABLE).get(obj.id);
    }


    return promise((resolve, reject) => {
      getDocuments
        .run()
        .then(response => {
          if (Array.isArray(obj)) {
            resolve(response);
          } else {
            resolve([response]);
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }


  findByTo ({ args }) {
    const to = args.to;
    const index = { index : 'to' };

    return promise((resolve, reject) => {
      r.table(TABLE)
        .getAll(to, index)
        .run()
        .then(response => {
          resolve(response[0]);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }


  findByService ({ args }) {
    const service = args.service;
    const index = { index : 'service' };

    return promise((resolve, reject) => {
      r.table(TABLE)
        .getAll(service, index)
        .run()
        .then(response => {
          resolve(response[0]);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }


  send ({ args, persist }) {

    return promise((resolve, reject) => {

      const mailOptions = ({
        date   : args.date,
        from   : args.from,
        service: args.service,
        subject: args.subject,
        html   : args.html,
        text   : args.text,
        to     : args.to
      });

      if (!mailerValidation(mailOptions).valid) return reject('Not valid mail');

      if (persist) {
        function callback (resolve) {
          return R.curry((response) => {
            if (response.errors) return response.errors;
          });
        }

        return insert({
          dbName   : 'mailer',
          tableName: TABLE,
          data     : mailOptions,
          db       : r,
          fn       : callback
        });
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log(info);
        return resolve(mailOptions);
      });
    });
  }
}
