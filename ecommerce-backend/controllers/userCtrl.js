export const userProfile = async (req, res, next) => {
  try {
    res.json({
      msg: "this is userProfile",
    });
  } catch (error) {
    next(error);
  }
};
