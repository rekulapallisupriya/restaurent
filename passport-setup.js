const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth2').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "479921508957-38hu1fjngrqdbqtbp125bec7l03c3dcd.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3300/google/callback",
    passReqToCallback: true

}, function(request, accessToken, refreshToken, profile, done){
    console.log(profile)
    return done(null, profile)
}))

passport.use(new FacebookStrategy({
    clientID: "333681248766153",
    clientSecret: "a2bbc1dc317ef7f8a10ca15259d94da5",
    callbackURL: "http://localhost:3300/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile)
    
  }
));