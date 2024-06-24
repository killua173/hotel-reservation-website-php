const mongoose = require('mongoose');

const RentedCarsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    CarId: { type: String, required: true },
    TotallPrice: { type: Number, required: true },
    Days: { type: String, required: true },
    PickUpDate: { type: Date, required: true },
   DropOffDate: { type: Date, required: true },
    isDoneRenting: { type: Boolean, required: true }
    
}, {
    collection: 'RentedCars',
    timestamps: true,
  
});
const RentedCars = mongoose.model('RentedCars', RentedCarsSchema);

module.exports = RentedCars;
