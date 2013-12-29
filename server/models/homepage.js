var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    banners: [{
        title: String,
        description: String,
        picture: {type: Types.Filepicker, widget: 'FilepickerPictureWidget'}
    }]
});

schema.statics.fetch = function(){
    var homepage = this;
    return function(res, cb){
        homepage.findOne().exec(function(err, result){
            if(result) res.locals.page.homepage = result;
            cb(err);
        })
    }
};

schema.formage = {
    section: 'Configuration',
    is_single: true
};

module.exports = schema;

