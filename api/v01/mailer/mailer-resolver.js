
export const mailerQueries = {
  mailerFind (_, args, context) {
    return context.connectors.mailer.find({ args, ...context });
  },

  mailerFindByFrom (_, args, context) {
    return context.connectors.mailer.findByFrom({ args, ...context });
  },

  mailerFindById (_, args, context) {
    return context.connectors.mailer.findById({ args, ...context });
  },

  mailerFindByTo (_, args, context) {
    return context.connectors.mailer.findByTo({ args, ...context });
  },

  mailerFindByService (_, args, context) {
    return context.connectors.mailer.findByService({ args, ...context });
  }
};


export const mailerMutations = {
  mailerSend (_, args, context) {
    const persist  = req.body && req.body.persist ? req.body.persist :  null;

    return context.connectors.mailer.send({ args, persist: persist });
  },
};
