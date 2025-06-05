const { fetchHolaMundo } = require('../services/hello');
const { MS1_URL, MS2_URL } = require('../config/environment');

const resolvers = {
  Query: {
    hello1: async () => await fetchHolaMundo(MS1_URL),
    hello2: async () => await fetchHolaMundo(MS2_URL)
  }
};

module.exports = resolvers;