export const mailersMock = [
  {
    id: '051e4c84-af48-4372-82b9-432879d115a3',
    date: '2016-09-07T20:26:41.925Z',
    from: 'Eli88@hotmail.com',
    html: '<b>At worrk</b>',
    subject: 'this is the subject',
    text: 'heres a message',
    to: 'Deon.Champlin18@yahoo.com',
    service: 'my_app'
  },
  {
    id: '69a40aa2-71e7-49b0-906a-da394f4fb469',
    date: '2015-11-18T10:10:05.619Z',
    from: 'Felicita46@yahoo.com',
    html: '<b>At worrk</b>',
    subject: 'this is the subject',
    text: 'heres a message',
    to: 'Lura.Pacocha77@yahoo.com',
    service: 'differentr_app'
  }
];

export default class MailerMock {
  find (query) { return find(query, mailersMock, 'service'); }
  findByFrom () { return findById(query, mailersMock, 'from'); }
  findById (query) { return findById(query, mailersMock, 'id'); }
  findByTo () { return findById(query, mailersMock, 'to'); }
  findByService () { return findById(query, mailersMock, 'service'); }
  send () { return send(query, mailersMock); }
}
