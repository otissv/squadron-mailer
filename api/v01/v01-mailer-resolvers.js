import { mailerQueries, mailerMutations } from './mailer/mailer-resolver';


export default {
  Query: {
    ...mailerQueries
  },

  Mutation: {
    ...mailerMutations
  }
};
