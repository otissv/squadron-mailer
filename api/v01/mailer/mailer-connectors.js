import rethinkdbdash from 'rethinkdbdash';
import Promise from 'bluebird';
import nodemailer from 'nodemailer';
import { insert } from '../../../utils//utils-rethinkdb';
import promise from '../../../utils/utils-promise';
import ERROR from '../errors/errors';
import { mail } from '../../../secret';
import { mailerValidation } from './mailer-model';
import R from 'ramda';


const r = rethinkdbdash({
  port: 28015,
  host: 'localhost',
  db: 'mailer'
});

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
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: mail.user, // Your email id
          pass: mail.password // Your password
        }
      });

      const mailOptions = ({
        date   : args.date,
        from   : args.from,
        service: args.service,
        subject: args.subject,
        html   : args.html,
        text   : args.text,
        to     : args.to
      });

      const sendMail = (resolve, reject) => {

      }

      if (!mailerValidation(mailOptions).valid) return reject('Not valid mail');


      if (persist) {
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
        return resolve(mailOptions);
      });
    });
  }
}
