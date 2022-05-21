const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./db');

const bcrypt=require('bcrypt');


const customFields = {
    usernameField: 'username',
    passwordField: 'password'
};

const verifyCallback = async(username, password, done) => {
    try {
        const [user]=await User.query(`select * from custamer where userName = '${username}' `);

        if (!user[0]) { return done(null, false) }
        const isValid=await bcrypt.compare(password, user[0].password);
        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        done(error);
    }
}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user[0].id);
});

passport.deserializeUser(async(userId, done) => {
    try {
        const [user] =await User.query(`select * from custamer where id = ${userId}`)
        done(null, user[0]);
    } catch (error) {
        done(error)
    }

});