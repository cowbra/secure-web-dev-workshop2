
const  mongoose = require('mongoose')

require('dotenv').config()
//console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI);


//import mongoose from 'mongoose';
const { Schema } = mongoose;

const Locations = new Schema({
    filmType:  String, // String is shorthand for {type: String}
    filmProducerName: String,
    endDate:   Date,
    filmName: String,
    district: String,
    geolocation:
        {
            coordinates: {
                type:[Number]
            },
            type: {
                type: String,
                enum:["Point"]
            }
        },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: String
});

const LocationModel = mongoose.model('LocationModel',Locations)
module.exports = LocationModel;

mongoose.connection.close();
