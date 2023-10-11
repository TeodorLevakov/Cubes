const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: /^https?/g,
            message: 'Img schuld start http/s'
        }
    },
    description: {
        type: String,
        required: true,
        maxlength: 120
    }
});

const Accessory = mongoose.model('Accessory', accessSchema);

exports.Accessory = Accessory;
