import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user_model.js";

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      return req.cookies.accessToken || null;
    },
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyJwt = async (payload, done) => {
  try {
    console.log("working fine");
    const user = await User.findById(payload.id);

    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
};

passport.use(new JwtStrategy(options, verifyJwt));

export default passport;
