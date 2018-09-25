const express = require('express');
const router = express.Router();
// Product Model
const Product = require('../../models/product');
// GET api/product
// get one product
// access: public
router.get('/:id', (req,res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => console.log('There has been ERROR: ' + err))
});

router.patch('/:id', (req,res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err){
            console.log(err);
        }else{
            req.body.customizeOptions.forEach(customizeOption => {
                product.customizeOptions = [...product.customizeOptions, customizeOption]
            })
            product.save((err, product) => {
                if (err){
                    console.log(err);
                }else{
                    res.json(product.customizeOptions);
                }
            })
        }
    })
    .catch(err => console.log("There has been ERROR: " + err))

})

// GET api/products
// get all products
// access: public
router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => console.log("There has been ERROR: " + err))

});

// POST api/product
// post product
// access: public
router.post('/', (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        pic: req.body.pic,
        price: req.body.price,
        sale: req.body.sale,
        customizeOptions: req.body.customizeOptions,
    });

    newProduct.save().then(product => res.json(product))
    .catch(err => console.log("There has been ERROR: " + err))

});

// DELETE api/product
// delete product
// access: public
router.delete('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => product.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

module.exports = router;
