// Builds the 5 standard CRUD handlers for any Mongoose model.
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = (Model, { populate = '', label = 'Record', afterDelete } = {}) => {
  const withPop = (q) => (populate ? q.populate(populate) : q);
  const notFound = () => Object.assign(new Error(`${label} not found`), { status: 404 });

  return {
    getAll: asyncHandler(async (req, res) => {
      res.json(await withPop(Model.find().sort({ createdAt: -1 })));
    }),
    getOne: asyncHandler(async (req, res) => {
      const doc = await withPop(Model.findById(req.params.id));
      if (!doc) throw notFound();
      res.json(doc);
    }),
    create: asyncHandler(async (req, res) => {
      const doc = await Model.create(req.body);
      res.status(201).json(await withPop(Model.findById(doc._id)));
    }),
    update: asyncHandler(async (req, res) => {
      const doc = await withPop(Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }));
      if (!doc) throw notFound();
      res.json(doc);
    }),
    remove: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) throw notFound();
      if (afterDelete) await afterDelete(doc);
      res.json({ message: `${label} deleted` });
    }),
  };
};
