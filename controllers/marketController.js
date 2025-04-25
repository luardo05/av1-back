const Market = require('../models/market');

// Criar novo usuário
exports.createMarket = async (req, res) => {
    try {
        const { name, address} = req.body;
        const market = new Market({ name, address});
        await market.save();
        res.status(201).json(market);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getMarkets = async (req, res) => {
    try {
        const markets = await Market.find();
        res.status(200).json(markets);
    } catch (err) { 
        res.status(400).json({ error: err.message });
    }
}

exports.getMarketById = async (req, res) => {
    try {
        const market = await Market.findById(req.params.id);
        if (!market) {
            return res.status(404).json({ message: 'Mercado não encontrado' });
        }
        res.status(200).json(market);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}  

exports.updateMarket = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address} = req.body;
        const updatedMarket = await Market.findByIdAndUpdate(id, {  name, address }, { new: true });
        if (!updatedMarket) {
            return res.status(404).json({ message: 'Mercado não encontrado' });
        }
        res.status(200).json(updatedMarket);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteMarket = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMarket = await Market.findByIdAndDelete(id);
        if (!deletedMarket) {
            return res.status(404).json({ message: 'Mercado não encontrado' });
        }
        res.status(200).json({ message: 'Mercado deletado com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}