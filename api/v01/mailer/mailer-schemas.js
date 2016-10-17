
export default `
type Mailer {
  id     : String,
  date   : String
  from   : String,
  service: String,
  subject: String,
  html   : String,
  text   : String,
  to     : String,
}
`;

export const mailerQueries = `
  mailerFind(from: String): [Mailer]
  mailerFindByFrom(from: String): Mailer
  mailerFindById(id: String): [Mailer]
  mailerFindByTo(to: String): Mailer
  mailerFindByService(service: String): Mailer
`;

export const mailerMutations = `
  mailerSend(
    id     : String,
    date   : String,
    from   : String,
    service: String,
    subject: String,
    html   : String,
    text   : String,
    to     : String,
  ): Mailer
`;
