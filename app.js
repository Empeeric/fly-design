var express = require('express'),
    http = require('http'),
    path = require('path');

require('./dust');

var app = express();

app.set('site', 'Fly Design');
app.set('port', process.env.PORT || 80);

app.engine('dust', require('consolidate').dust);
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, 'views'));

app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// routes
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/second', function(req, res) {
    res.render('second');
});
app.get('/third', function(req, res) {
    res.render('third');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});