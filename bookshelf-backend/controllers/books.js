const Book = require('../models/Book');

// Create
exports.createBook = async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// Read all with pagination & filter
exports.getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, genre, startDate, endDate } = req.query;
    const query = {};
    if (genre) query.genre = genre;
    if (startDate || endDate) {
      query.readDate = {};
      if (startDate) query.readDate.$gte = new Date(startDate);
      if (endDate) query.readDate.$lte = new Date(endDate);
    }

    const books = await Book.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ readDate: -1 });

    const total = await Book.countDocuments(query);
    res.json({ books, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (err) {
    next(err);
  }
};

// Read one
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};

// Stats: Số sách đã đọc trong tháng
exports.getMonthlyStats = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    
    const stats = await Book.aggregate([
      { $match: { readDate: { $gte: start, $lte: end } } },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
    
    res.json({ booksRead: stats[0]?.count || 0 });
  } catch (err) {
    next(err);
  }
};