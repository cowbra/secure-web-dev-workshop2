//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
const  mongoose = require('mongoose')

require('dotenv').config()



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

const LocationModel = mongoose.model('Location',Locations)
module.exports = LocationModel;




function importFilmingLocationInMongo(){
    for(let)

}

async function main(){
    const connected = await mongoose.connect(process.env.MONGO_URI);
    console.log(connected);

    const horrorMovie = new LocationModel({filmType:'horror'});
    await horrorMovie.save();
    await mongoose.connection.close();
}



main()

/*
new Model({fgfg})
