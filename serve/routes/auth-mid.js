export const authMiddleware = (req, res, next) => {
  const info = req.query.user;
  if (info === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
