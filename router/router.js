const { Router } = require('express')

const { createUser, getUser, getUserById, updateUser, deleteUser } = require('./controller/users/controller')
const { createBook, getBook, getBookById, updateBook, deletBook } = require('./controller/books/controller')
const { login, token, logout } = require('./controller/login/controller')
const { middleware, auth } = require('./middleware/controller')

const router = Router()

router.post('/login', login)
router.post('/token', token)
router.delete('/logout', logout)

router.post('/users', auth, middleware, createUser)
router.get('/users', auth, middleware, getUser)
router.get('/users/:Id', auth, middleware, getUserById)
router.put('/users/:Id', auth, middleware, updateUser)
router.patch('/users/:Id', auth, middleware, updateUser)
router.delete('/users/:Id', auth, middleware, deleteUser)

router.post('/books', auth, createBook)
router.get('/books', auth, getBook)
router.get('/books/:Id', auth, getBookById)
router.put('/books/:Id', auth, updateBook)
router.patch('/books/:Id', auth, updateBook)
router.delete('/books/:Id', auth, deletBook)

module.exports = router
