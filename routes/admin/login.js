var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');
var bodyParser = require('body-parser');
var session = require('express-session');

var sessions = session({
	secret:'key',
	saveUninitialized:true,
	resave:false
});

// var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended:true }));

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false});

router.get('/', function(req, res, next) {
	res.render('admin/login', {
		layout:'admin/login'
	});
});

router.get('/logout', function(req, res, next){
	req.session.destroy();
	res.render('admin/login', {
		layout: 'admin/layout'
	});
});

router.post('/',urlencodedParser,sessions,  async (req, res, next) => {
	try {
		console.log(usuario);
		console.log(password);

		var usuario = req.body.usuario;
		var password = req.body.password;
		
		var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);
		if (data != undefined ){
			req.session.id_usuario = data.id;
			req.session.nombre = data.usuario;
			res.redirect('/admin/novedades');
		} else{
			res.render('admin/login', {
				layout:'admin/layout',
				error: true
			});
		}
	} catch(error) {
		console.log(error)
	}
})




module.exports = router;