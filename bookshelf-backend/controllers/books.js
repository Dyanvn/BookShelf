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
    const { page = 1, limit = 10, genre, startDate, search } = req.query;
    const query = {};

    // Lọc theo thể loại
    if (genre && genre !== 'all') {
      query.genre = genre;
    }

    // Lọc theo ngày bắt đầu
    if (startDate) {
      query.readDate = { $gte: new Date(startDate) };
    }

    // 🔍 Lọc theo tên sách hoặc tác giả
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },   // không phân biệt hoa/thường
        { author: new RegExp(search, 'i') }
      ];
    }

    const books = await Book.find(query)
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .sort({ readDate: -1 });

    const total = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
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
exports.getYearlyStats = async (req, res, next) => {
  try {
    const { year } = req.query;
    const start = new Date(year, 0, 1);  // 01/01/year
    const end = new Date(year, 11, 31); // 31/12/year
    
    const stats = await Book.aggregate([
      { $match: { readDate: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $month: "$readDate" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // format lại cho frontend dễ vẽ chart
    const result = stats.map(s => ({
      month: s._id,
      books: s.count
    }));

    res.json(result);
  } catch (err) {
    next(err);
  }
};