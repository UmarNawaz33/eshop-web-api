const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

//get all categories
router.get(`/`, async (req, res) => {
    try {
        const categoryList = await Category.find();

        if (!categoryList) {
            res.status(500).json({ success: false })
        }
        res.status(200).send(categoryList);
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    }
})

//get category with specific id
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            res.status(500).json({ success: false, message: "The category with the given id was not found" });
        }
        res.status(200).send(category);
    } catch(err) {
        res.status(400).json({ success: false, error: err });
    }
});

//update category with specific id
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        {new: true}); //to get the new updated data otherwise old object would be returned
        if (!category)
        return res.status(400).json({success: false, message: "the category cannot be update"});

        res.send(category);
    } catch (err) {
        res.status(400).json({success: false, error: err});
    }
})

//post a category
router.post('/', async (req, res) => {
    try {
        let category = Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        });
        category = await category.save();
    
        if (!category) {
            return res.status(404).send('the category cannot be created!');
        }
        res.send(category);
    } catch(err) {
        res.status(400).json({ success: false, error: err });   
    }
});

//delete a category with specific id
router.delete('/:id', async (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: "the category is deleted!" });
        } else {
            return res.status(404).json({ success: false, message: "category not found!" });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    })
})

module.exports = router;