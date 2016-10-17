import mocks from './mocks';


import Mailer from './mailer/mailer-connectors';


const { mailersMock } = mocks;


function connectors (mock) {
  return {
    mailer    : mock ? mailersMock    : Mailer
  };
};


export default connectors;
