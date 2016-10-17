import { mailerQueries, mailerMutations } from './mailer/mailer-resolvers';


export default {
  Query: {
    ...mailerQueries
  },

  Mutation: {
    ...mailerMutations
  }
};
