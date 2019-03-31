import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import User from '../models/User'

import validateRegister from '../validation/register'
import validateLogin from '../validation/login'

const router = express.Router()

// @route   POST api/user/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegister(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email is already taken.'
      return res.status(400).json(errors)
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        isShelter: req.body.isShelter,
        driverPhoneNumbers: req.body.driverPhoneNumbers,
        capacity: req.body.capacity
      })

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route   POST api/user/login
// @desc    Log a user in
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = 'User not found.'
      return res.status(404).json(errors)
    } else {
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            zipcode: user.zipcode,
            phone: user.phone,
            isShelter: user.isShelter,
            driverPhoneNumbers: user.driverPhoneNumbers,
            capacity: user.capacity
          }

          jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 10800 }, // 3 hours
            (err, token) => {
              if (err) throw err
              return res.json({
                success: true,
                token: 'Bearer ' + token
              })
            }
          )
        } else {
          errors.password = 'Password is incorrect.'
          return res.status(400).json(errors)
        }
      })
    }
  })
})

// @route   GET api/user/
// @desc    Return the current user
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      address: req.user.address,
      zipcode: req.user.zipcode,
      phone: req.user.phone,
      isShelter: req.user.isShelter,
      driverPhoneNumbers: req.user.driverPhoneNumbers,
      capacity: req.user.capacity
    })
  }
)

export default router
