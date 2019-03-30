import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import Business from '../models/Business'

import validateBusinessRegister from '../validation/businessRegister'
import validateBusinessLogin from '../validation/businessLogin'

const router = express.Router()

// @route   POST api/business/register
// @desc    Register a business
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateBusinessRegister(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Business.findOne({ email: req.body.email }).then(business => {
    if (business) {
      errors.email = 'Email is already taken.'
      return res.status(400).json(errors)
    } else {
      const newBusiness = new Business({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        zipcode: req.body.zipcode,
        phone: req.body.phone
      })

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newBusiness.password, salt, (err, hash) => {
          if (err) throw err
          newBusiness.password = hash
          newBusiness
            .save()
            .then(business => res.json(business))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route   POST api/business/login
// @desc    Log business in
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateBusinessLogin(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Business.findOne({ email: req.body.email }).then(business => {
    if (!business) {
      errors.email = 'Business not found.'
      return res.status(404).json(errors)
    } else {
      bcrypt.compare(req.body.password, business.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: business.id,
            name: business.name,
            email: business.email,
            address: business.address,
            zipcode: business.zipcode,
            phone: business.phone
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

// @route   GET api/business/current
// @desc    Return the current business
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      address: req.user.address,
      zipcode: req.user.zipcode,
      phone: req.user.phone
    })
  }
)

export default router
