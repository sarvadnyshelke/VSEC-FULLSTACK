// Returns getAll, getOne, create, update and remove for any Mongoose model.
module.exports = (Model, label) => ({
  getAll: async (req, res, next) => {
    try {
      res.json(await Model.find().sort({ createdAt: -1 }));
    } catch (err) { next(err); }
  },

  getOne: async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: `${label} not found` });
      res.json(item);
    } catch (err) { next(err); }
  },

  create: async (req, res, next) => {
    try {
      res.status(201).json(await Model.create(req.body));
    } catch (err) { next(err); }
  },

  update: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ message: `${label} not found` });
      res.json(item);
    } catch (err) { next(err); }
  },

  remove: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: `${label} not found` });
      res.json({ message: `${label} deleted` });
    } catch (err) { next(err); }
  },
});
