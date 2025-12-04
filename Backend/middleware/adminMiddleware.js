// module.exports = (req, res, next) => {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied. Admins only." });
//     }
//     next();
//   };
module.exports = function adminMiddleware(req, res, next) {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin access only" });
    }
    next();
  };
  