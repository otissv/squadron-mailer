import isSchema from 'is-schema-valid';


export const mailerModel = {
  id     : 'string',
  date   : { type: 'string', required: true },
  from   : { type: 'string', required: true },
  service: { type: 'string', required: true },
  subject: { type: 'string', required: true },
  html   : { type: 'string', required: true },
  text   : { type: 'string', required: true },
  to     : { type: 'string', required: true },
};


export const mailerValidation = isSchema(mailerModel);
