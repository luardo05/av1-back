const express = require('express');
const router = express.Router();
const { createMarket, getMarkets, getMarketById, updateMarket, deleteMarket } = require('../controllers/marketController');

// Rotas de mercados
router.post('/', createMarket);
router.get('/', getMarkets);
router.get('/:id', getMarketById);
router.put('/:id', updateMarket);
router.delete('/:id', deleteMarket);

module.exports = router;
