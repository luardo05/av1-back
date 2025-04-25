const Product = require('../models/product');

// Criar novo usuário
exports.createProduct = async (req, res) => {
    try {
        const { product_name, market, brand, price } = req.body;
        const product = new Product({ product_name, market, brand, price });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const search = req.query.q;
        let products;

        if (search) {
            products = await Product.find({
                product_name: { $regex: search, $options: 'i' }
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}  

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, market, brand, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, {  product_name, market, brand, price }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}