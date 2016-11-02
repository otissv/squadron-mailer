import  mailer, { mailerQueries, mailerMutations } from './mailer/mailer-schema';


const typeDefinitions = `
type Query {
  ${mailerQueries}
}
type Mutation {
  ${mailerMutations}
}

schema {
  query: Query
  mutation: Mutation
}
`;

export default [
  typeDefinitions,
  mailer,
];
