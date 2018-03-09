const mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
    name: String,
    status: {
        type: String,
        enum: ['p', 'c'],
        default: 'p'
    }
});

var Sections = mongoose.model('Section', sectionSchema);

module.exports = Sections;