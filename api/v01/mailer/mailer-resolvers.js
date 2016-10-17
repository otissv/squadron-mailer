
export const mailerQueries = {
  mailerFind (_, args, { connectors }) {
    return connectors.mailer.find({ args });
  },

  mailerFindByFrom (_, args, { connectors }) {
    return connectors.mailer.findByFrom({ args });
  },

  mailerFindById (_, args, { connectors }) {
    return connectors.mailer.findById({ args });
  },

  mailerFindByTo (_, args, { connectors }) {
    return connectors.mailer.findByTo({ args });
  },

  mailerFindByService (_, args, { connectors }) {
    return connectors.mailer.findByService({ args });
  }
};


export const mailerMutations = {
  mailerSend (_, args, { connectors, req }) {
    const persist  = req.body && req.body.persist ? req.body.persist :  null;

    return connectors.mailer.send({ args, persist: persist });
  },
};
