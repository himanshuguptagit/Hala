
let _LoginCount = 0;
module.exports = function barrFifthRequest(req, res, next) {
    _LoginCount++;

    if (_LoginCount == 5) {
        _LoginCount = 0;
        res.status(401).send("Barring 5th request");
    } else {
      next();
    }
  };