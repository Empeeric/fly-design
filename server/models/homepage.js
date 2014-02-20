var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    slider: {
        title: String,
        lead: String,
        url: String,
        banners: [{
            picture: {type: Types.Filepicker, widget: 'FilepickerPictureWidget'},
            description: Types.Text,
            url: String
        }]
    },
    about: {
        quote: Types.Text,
        signature: String,
        text: Types.Html
    },
    boxes: [{
        icon: {type: String, enum: ['eye', 'hand', 'key']},
        title: String,
        text: Types.Text,
        url: String
    }],
    customers_pictures: [{type: Types.Filepicker, widget: 'FilepickerPictureWidget'}],
    how_it_works: {
        title: String,
        list: [{
            title: String,
            text: Types.Text
        }]
    },
    us: {
        picture: {type: Types.Filepicker, widget: 'FilepickerPictureWidget'},
        title: String,
        text: Types.Text,
        sub_text: Types.Text,
        url: String

    },
    contact: {
        title: String,
        text: Types.Text,
        phone: String,
        email: String,
        facebook: String,
        address: String,
        map: {type: Types.Filepicker, widget: 'FilepickerPictureWidget'}
    }
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

