const { ITEM } = require('../models/item');
const getData = async (req, res) => {

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;

    let result = ITEM.find({});

    result = result.skip(skip).limit(limit);

    const items = await result;
    res.status(200).json({ items });
}

const createItem = async (req, res) => {
    const data = req.body;
    if (!data) {
        res.status(400).json({ error: "Please provide data to create an item" });
    }

    const item = await ITEM(data);
    await item.save();
    res.status(200).json({ item: item });
}


module.exports = { getData, getSimilarData, createItem };