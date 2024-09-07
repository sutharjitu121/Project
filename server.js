const express = require('express')
const partials = require('express-partials')
require('dotenv').config();
var session = require('express-session');
const fileUpload = require('express-fileupload')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const compression = require('compression')
const app = express()
const http = require('http').Server(app);
const fs = require('fs');
var svgCaptcha = require('svg-captcha');
var cookieParser = require('cookie-parser');
var flash = require('req-flash');
const host = process.env.HOST || 'localhost'
app.set('port', process.env.PORT || 3800)

global.baseURL = 'http://' + host + ':' + app.get('port') + '/'
global.basePath = __dirname
global.uploadURL = baseURL + 'uploads/'
global.uploadPath = basePath + '/uploads/'
global.uploadDir = 'uploads/'

process.env.Email_Admin_Register =  'ipearlsblack@gmail.com';
process.env.Email_Admin_Register_Pass = 'Suthar@8055';
process.env.Email_host = 'smtp.gmail.com';
process.env.Email_port = 587;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(partials());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }))

app.use(cors());
app.use(fileUpload())
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
resave: false,
saveUninitialized: true
}));
app.use(flash());
app.listen(app.get('port'), host, (error) => {
  console.log('Listening on http://' + host + ':' + app.get('port'))
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/public', express.static(path.join(__dirname, 'public')))
// app.use('/admin_assets', express.static(path.join(__dirname, 'adminAssets')))


process.env.BASE_URL = 'http://' + host + ':' + app.get('port')
process.env.ASSETS_URL = process.env.BASE_URL + '/public/'
process.env.ADMIN_ASSETS_URL = process.env.BASE_URL + '/public/admin/'
process.env.ADMIN_UPLOAD_URL = process.env.BASE_URL + '/uploads/'
process.env.UNAVAILABLE_IMAGE = "/img/Picture-Unavailable.jpg"

var AdminAuth = require('./controller/admin/auth.controller')

app.use('/', require('./routes/home.routes'))
app.use('/admin', require('./routes/admin/admin.routes'))
app.use('/admin/user', AdminAuth.sessionChecker, require('./routes/admin/user.routes'))
app.use('/admin/membership', require('./routes/admin/membership.routes'))
app.use('/admin/team', AdminAuth.sessionChecker, require('./routes/admin/team.routes'))
app.use('/admin/gallery', AdminAuth.sessionChecker, require('./routes/admin/gallery.routes'))
app.use('/admin/gallery_category', AdminAuth.sessionChecker, require('./routes/admin/gallery_category.routes'))
app.use('/admin/review', AdminAuth.sessionChecker, require('./routes/admin/review.routes'))
app.use('/admin/about', AdminAuth.sessionChecker, require('./routes/admin/about.routes'))
app.use('/admin/contact', require('./routes/admin/contact.routes'))
app.use('/admin/blog', AdminAuth.sessionChecker, require('./routes/admin/blog.routes'))
app.use('/admin/f_and_q', AdminAuth.sessionChecker, require('./routes/admin/f_and_q.routes'))
app.use('/admin/setting', AdminAuth.sessionChecker, require('./routes/admin/setting.routes'))
app.use('/admin/services', AdminAuth.sessionChecker, require('./routes/admin/services.routes'))
app.use('/admin/video', AdminAuth.sessionChecker, require('./routes/admin/video.routes'))
app.use('/admin/subscribeemail', require('./routes/admin/subscribeemail.routes'))


app.use('/*', require('./routes/home.routes'))
// app.use('/admin/*', require('./routes/admin/admin.routes'))