var app = require.main.exports;

app.get('/', function(req, res) {
    res.render('index');
});

'second,third,about,sh'.split(',').forEach(function(page) {
    app.get('/' + page, function(req, res) {
        res.render(page);
    });
});