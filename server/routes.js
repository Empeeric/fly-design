var registry = require('./global'),
    app = require.main.exports.app,
    models = require('./models'),
    mail = require('nodemailer').createTransport('SMTP', {
        service: "SendGrid",
        auth: registry.SENDGRID_AUTH
    }),
    dust = require('dustjs-linkedin'),
    config = models.config.middleware();

app.post('/thank-you', config, function (req, res) {
    var config = res.locals.config;
    var o = req.body,
        template = '<ul>',
        send = false;

    Object.each(o, function(key, value){
        o[key] = value.stripTags().trim();

        if(o[key].length) {
            template += '<li><label for="">'+ key +': </label>{'+ key +'}</li>';
            send = true
        }
    });

    template += '</ul>';

    if(send){
        o.req = {headers: req.headers, session: req.session, ip: req.ip};
        o.date = new Date();

        var message = {};
        message.to = config.contact.email;
        message.from = o.email || config.contact.email;
        message.subject = config.contact.subject;

        dust.loadSource(dust.compile(template, "email_template"));

        dust.render('email_template', o, function(err, text){
            message.html = text;
        });

        mail.sendMail(message, function (err, response) {
            res.json({ success: !err });
        })
    }else{
        res.json({ success: true });
    }
});
