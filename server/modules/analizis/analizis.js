const { Router } = require('express');
const model = require('./analizis.model');

const router = Router();

router.get('/', (req, res) => {
  res.json(model.getAll());
});

router.post('/', (req, res) => {
  const { url } = req.body.data;
  model.add(url).then((id) => {
    res.json({ url, id });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const job = model.get(id);
  if (job === null) {
    return res.json({ id });
  }
  return res.json(job);
});

module.exports = router;
