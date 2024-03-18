const jwt = require("jsonwebtoken");
const E_User = require("../model/em_user")

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.SECRET);

    if (Date.now() > decoded.exp) return res.sendStatus(401);

    const user = await E_User.findById(decoded.id);
    if (!user) return res.sendStatus(401);

    req.user = user;

    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;