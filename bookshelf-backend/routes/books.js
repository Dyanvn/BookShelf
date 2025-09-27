
const express = require('express');
const { createBook, getBooks, getBookById, updateBook, deleteBook, getMonthlyStats } = require('../controllers/books');

const router = express.Router();

router.post('/', createBook);
router.get('/', getBooks);
router.get('/stats', getMonthlyStats);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;