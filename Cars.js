const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Pho1: { type: String, required: true},
    Pho2: { type: String, required: true},
    name1: { type: String, required: true},
    location: { type: String, required: true},
    validTill: { type: Date, required: true},
    willBeValidAt: { type: Date, required: true},
    availability: { type: Boolean, required: true},
    CostPerDay: { type: Number, required: true }
}, {
    collection: 'Cars',
});
const UserModel = mongoose.model('Cars', UserSchema);

module.exports = UserModel;
