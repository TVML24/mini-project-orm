const Traveller = require('./traveller');
const Location = require('./location');
const Trip = require('./trip');

// This makes a link from a traveller to a location via the primary key of that table
// belongs to many means that one traveller may have many locations
// these will be added in a new column called 'planned_trips'
Traveller.belongsToMany(Location, {
    through: {
        model: Trip,
        unique: false
    },
    as: 'planned_trips'
});

// this has a similar effect to the the query above, except reversed so that one location may have many travellers
// stored in a column called location_travellers
Location.belongsToMany(Traveller, {
    through: {
        model: Trip,
        unique: false
    },
    as: 'location_travellers'
});

module.exports = { Traveller, Location, Trip };