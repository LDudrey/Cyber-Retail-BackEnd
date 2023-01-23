const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags, include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET single tag, include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST/CREATE a new tag
router.post('/', async (req, res) => {
  try {
    const userData = await Tag.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT/UPDATE a tag's name by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const upTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
        product_id: req.body.product_id,
      },
      {
        where: {
          id: req.params.id,
        },
      });
    res.status(200).json(upTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// DELETE one tag by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
