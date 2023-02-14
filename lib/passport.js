var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userDatabase = require('./conn/userDB');
var userDB = new userDatabase();

function config(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		userDB.getUserByID(id).then(function(result){
			done(null, result);
		});
	});
	
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, done){
		userDB.usernameExists(username).then(function(result){
			if(result){
				console.log(`Usuario ${username} ya está registrado.`);
				return done(null, false);
			}
			else{
				user = userDB.createNew(username, password, false).then(function(user){
					console.log(`Registro de ${username} completo.`);
					return done(null, user);
				});
			}
		});
	}));
	
	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
		}, function(req, username, password, done){
			userDB.validate(username, password).then(function(result){
				if(result){
					console.log(`Usuario ${username} loggeado correctamente.`);
					return done(null, result);
				}
				else{
					console.log(`Error al loggear a ${username}.`);
					return done(null, false);
				}
			});
		}));
}

config(passport);

module.exports = passport;