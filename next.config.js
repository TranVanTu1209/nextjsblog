/** @format */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGO_CLIENT_URI:
          "mongodb+srv://tutran:tutran@cluster0.sqsn1.mongodb.net/myblog?retryWrites=true&w=majority",
      },
    };
  }

  return {
    env: {
      MONGO_CLIENT_URI:
        "mongodb+srv://tutran:tutran@cluster0.sqsn1.mongodb.net/myblog?retryWrites=true&w=majority",
    },
  };
};
