import jwt from 'jsonwebtoken'
import config from 'config'
// eslint-disable-next-line prefer-const
let refreshTokens = []

const login = (req, res) => {
  try {
    const { username, password, type } = req.body
    const payload = {
      username: username,
      password: password, //! Should not be kept in TOKEN!!!
      type: type
    }
    const accessToken = generateAccessToken(payload)
    const refreshToken = jwt.sign(payload, config.get('jwt.refreshtoken'))
    refreshTokens.push(refreshToken)
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshTokens })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const token = (req, res) => {
  try {
    const refreshtoken = req.body.token
    if (refreshtoken == null) {
      res.sendStatus(401)
    }
    if (!refreshtoken.includes(refreshtoken)) {
      res.sendStatus(403)
    }
    jwt.verify(refreshtoken, config.get('jwt.refreshtoken'), (err, payload) => {
      if (err) {
        res.sendStatus(403)
      }
      const accessToken = generateAccessToken({ username: payload.username, type: payload.type })
      res.json({ accessToken: accessToken })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown internal server error.'
    })
  }
}

const logout = (req, res) => {
  try {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.status(200).json('logout')
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown internal server error.'
    })
  }
}

function generateAccessToken (payload) {
  return jwt.sign(payload, config.get('jwt.secret'), { expiresIn: '30s' })
}

module.exports = { login, token, logout }
