let io;
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      const error = new Error("socket failed");
      throw error;
    }
    return io;
  },
};
