import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'

//@des  Fetch all books
//@route  GET /api/books/
//@access  Public
const getBooks = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const books = await Book.find({ ...keyword })
  if (books && books.length) {
    res.json({ books })
  } else {
    res.status(404).json({ message: 'Books not found!' })
  }
})

//@des  Fetch book by id
//@route  GET /api/books/:id
//@access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (book) {
    res.json({ book })
  } else {
    res.status(404).json({ message: 'Books not found' })
  }
})

//@des  Create book
//@route  POST /api/books/
//@access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const {
    name,
    author,
    imageLink,
    language,
    link,
    pages,
    year,
    price,
    countInStock,
  } = req.body

  const book = new Book({
    user: req.user._id,
    name,
    author,
    imageLink,
    language,
    link,
    pages,
    year,
    price,
    countInStock,
  })

  const newBook = await book.save()

  res.send(201).json({ message: 'Book added' })
})

//@des  Delete book
//@route  DELETE /api/books/:id
//@access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (book) {
    await book.remove()
    res.json({ message: 'Delete Success!' })
  } else {
    res.status('404').json({ message: 'Book not found!' })
  }
})

//@des  Update book
//@route  Put /api/books/:id
//@access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (book) {
    const {
      name,
      author,
      imageLink,
      language,
      link,
      pages,
      year,
      price,
      countInStock,
    } = req.body

    book.user = req.user._id
    book.name = name
    book.author = author
    book.imageLink = imageLink
    book.language = language
    book.link = link
    book.pages = pages
    book.year = year
    book.price = price
    book.year = year
    book.countInStock = countInStock

    const newBook = await book.save()
    res.json(newBook)
  } else {
    res.status(404).json({ message: 'Book not found!' })
  }
})

export { getBooks, getBookById, createBook, deleteBook, updateBook }
