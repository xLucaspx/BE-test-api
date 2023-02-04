/* NotFoundError is to be used to handle a 404 status response for
a requisition and transmit this code to the controller layer */
class NotFoundError extends Error {}

module.exports = NotFoundError;
