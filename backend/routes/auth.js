const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { sequelize } = require('../helpers/config')
const jwt = require('jsonwebtoken')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      sequelize
        .query(
          `SELECT * FROM Users where Email='${email}' and Password='${password}'`,
          { type: sequelize.QueryTypes.SELECT }
        )
        .then(user => {
          if (user.length != 1) {
            sequelize
              .query(
                `SELECT * FROM Guides where Email='${email}' and Password='${password}'`,
                { type: sequelize.QueryTypes.SELECT }
              )
              .then(guide => {
                if (guide.length != 1) {
                  return done(null, false, {
                    message: 'Invalid login credentials'
                  })
                } else {
                  return done(null, {
                    data: JSON.stringify(guide[0]),
                    isGuide: true
                  })
                }
              })
          } else {
            return done(null, {
              data: JSON.stringify(user[0]),
              isGuide: false
            })
          }
        })
    }
  )
)

router.post('/local', async (req, res, next) => {
  passport.authenticate('local', async (err, user) => {
    if (err || !user) {
      const error = new Error('Authentication error!')
      return next(error)
    } else {
      req.login(user, { session: false }, async error => {
        if (error) return next(error)
        const body = {
          data: user.data,
          isGuide: user.isGuide
        }
        const token = jwt.sign(
          {
            data: body.data,
            isGuide: body.isGuide
          },
          'secret'
        )
        return res.json({
          sucess: true,
          err: null,
          token
        })
      })
    }
  })(req, res, next)
})

router.post(
  '/newGuide/:name/:surname/:age/:email/:phoneNumber/:password',
  function (req, res, next) {
    let name = req.params.name
    let surname = req.params.surname
    let age = req.params.age
    let email = req.params.email
    let phoneNumber = req.params.phoneNumber
    let password = req.params.password

    sequelize
      .query(`SELECT * FROM Guides where email='${email}'`, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(pairs => {
        if (pairs.length > 0) {
          return next(new Error('Adres email już w użyciu!'))
        } else {
          sequelize
            .query(
              `INSERT INTO Guides VALUES (NULL, 0, '${name}',
      '${surname}', '${age}', '${email}', '${phoneNumber}', ' ', '${password}');`,
              { type: sequelize.QueryTypes.INSERT }
            )
            .then(guides => res.json(guides))
        }
      })
  }
)

router.post(
  '/newUser/:name/:surname/:age/:email/:phoneNumber/:password',
  function (req, res, next) {
    let name = req.params.name
    let surname = req.params.surname
    let age = req.params.age
    let email = req.params.email
    let phoneNumber = req.params.phoneNumber
    let password = req.params.password

    sequelize
      .query(`SELECT * FROM Users where email='${email}'`, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(pairs => {
        if (pairs.length > 0) {
          return next(new Error('Adres email już w użyciu!'))
        } else {
          sequelize
            .query(
              `INSERT INTO Users VALUES (NULL, 0, '${name}',
    '${surname}', '${age}', '${email}', '${phoneNumber}', '${password}');`,
              { type: sequelize.QueryTypes.INSERT }
            )
            .then(guides => res.json(guides))
        }
      })
  }
)

module.exports = router
