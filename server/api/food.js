import express from 'express'
import passport from 'passport'

import User from '../model/User'
import Food from '../model/Food'

import validateFoodPost from '../validation/foodpost'

const router = express.Router()

// @route   GET api/artistgallery/all
// @desc    Query the number of Artist Galleries
// @access  Public
router.get('/all', (req, res) => {
  const errors = {}
  ArtistGallery.count()
    .then(noofgalleries => {
      if (noofgalleries === 0) {
        errors.nogallery = 'There are no gallery.'
        return res.status(404).json(errors)
      } else {
        return res.json(noofgalleries)
      }
    })
    .catch(err => res.status(500).json(err))
})

// @route   GET api/artistgallery/handle/:handle
// @desc    Get Artist Gallery by Handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  ArtistGallery.findOne({ handle: req.params.handle })
    .populate('artist', ['name', 'avatar'])
    .then(artistgallery => {
      if (!artistgallery) {
        errors.noprofile = 'There is no gallery found for screen name'
        return res.status(404).json(errors)
      } else {
        return res.json(artistgallery)
      }
    })
    .catch(err => res.status(500).json(err))
})

// @route   POST api/artistgallery
// @desc    Create or Edit Artist Gallery
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateArtistGalleryInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const info = {}

    info.artist = req.user.id
    if (req.body.handle) info.handle = req.body.handle
    if (req.body.bio) info.bio = req.body.bio

    ArtistGallery.findOne({ artist: req.user.id }).then(artistgallery => {
      if (artistgallery) {
        // Artist Gallery found => Update
        ArtistGallery.findOneAndUpdate(
          { artist: req.user.id },
          { $set: info },
          { new: true }
        ).then(artistgallery => res.json(artistgallery))
      } else {
        // Artist Gallery not found => Create
        ArtistGallery.findOne({ handle: info.handle }).then(artistgallery => {
          if (artistgallery) {
            errors.handle = 'Screen name is already taken'
            res.status(400).json(errors)
          } else {
            new ArtistGallery(info)
              .save()
              .then(artistgallery => res.json(artistgallery))
          }
        })
      }
    })
  }
)

// @route   DELETE api/artistgallery
// @desc    Delete Artist and Artist Gallery
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    ArtistGallery.findOneAndRemove({ artist: req.user.id }).then(() => {
      Artist.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      )
    })
  }
)

module.exports = router
