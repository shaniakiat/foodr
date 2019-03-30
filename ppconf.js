import env from 'dotenv'
import passportJWT from 'passport-jwt'
import Business from './models/Business'

env.config()

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET

export default passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      Business.findById(jwtPayload.id)
        .then(business => {
          if (business) {
            return done(null, business)
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
    })
  )
}
