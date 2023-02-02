const Services = require('./Services');

class UserServices extends Services {
  constructor() {
    super('https://mockend.com/xLucaspx/BE-test-api/users');
  }
}

module.exports = UserServices;
