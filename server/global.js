var registry = module.exports = global.registry = {
    PORT: process.env.PORT || 80,
    FAKE_SOCKET: {emit: function(){}, on: function(){}, isFake: true},
    PASSPORT_COOKIE_NAME: 'fly-auth',
    COOKIE_SECRET: 'fly secret cookie',
    SENDGRID_AUTH: {user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD},
    ADMIN: {user: process.env.ADMIN_USER || 'admin', password: process.env.ADMIN_PASSWORD || 'admin'},
    SOCKET_TRANSPORTS: process.env.SOCKET_TRANSPORTS && process.env.SOCKET_TRANSPORTS.split(',') || ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'],
    userSockets: {},
    mongo_cfg: process.env.MONGOLAB_URI || 'mongodb://localhost/fly-design'
};
