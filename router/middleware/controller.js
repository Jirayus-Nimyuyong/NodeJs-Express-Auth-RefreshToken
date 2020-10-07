const expressjwt = require('express-jwt')
const config = require('config')

const auth = expressjwt({ secret: config.get('jwt.secret') })

const middleware = (req, res, next) => {
  try {
    const { user: { username, type } } = req
    if (username === 'gotham' & type === 'user') {
      next()
    } else {
      res.status(406).json({
        status: 406,
        code: 'TOKEN_NOT_AVAILABLE',
        message: 'Token not available.'
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

module.exports = { middleware, auth }
