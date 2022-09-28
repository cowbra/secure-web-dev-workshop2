//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
const  mongoose = require('mongoose')
require('dotenv').config()

const filmingLocations = require('./lieux-de-tournage-a-paris.json')

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
                enum:["Point",""]
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




async function importFilmingLocationInMongo(){
    let chunk = []
    for (const film of filmingLocations) {
        const newFilmModelToInsert = new LocationModel({ filmType: film.fields.type_tournage},
            { filmProducerName: film.fields.nom_producteur },
            { endDate: film.fields.date_fin},
            { filmName: film.fields.nom_tournage},
            { district: film.fields.ardt_lieu},
            { geolocation: film.fields.geo_shape.coordinates },
            { type: film.fields.geo_shape.type },
            { sourceLocationId: film.fields.id_lieu },
            { filmDirectorName: film.fields.nom_realisateur},
            { adress: film.fields.adresse_lieu},
            { startDate: film.fields.date_debut},
            { year: film.fields.annee_tournage });
        //On insere des promesses de donnees à envoyer à la bdd
        chunk.push(newFilmModelToInsert.save())
        
        //tous les 100 models de films, on envoie à la bdd mongo
        if(chunk.length===100){
            await Promise.all(chunk)
            chunk = []
        }
        //on envoie les models restants
        const results = await Promise.all(chunk)
        //on affiche le resultat de la promesse des derniers elements
        console.log(results)


    }

}

async function main(){
    const connected = await mongoose.connect(process.env.MONGO_URI);
    console.log(connected);

    //On envoie les models sur mongo
    importFilmingLocationInMongo()
    await mongoose.connection.close();
}



main();