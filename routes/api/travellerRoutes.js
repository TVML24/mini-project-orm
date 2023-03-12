const router = require('express').Router();
const { Traveller, Trip, Location } = require('../../models');

// to GET all travellers 
// note the async here force the app to wait until findall() method (built into sequelize) returns all the data from the traveller table (using the await keyword)
router.get ('/', async (req, res) => {
// try tells the app to use this code first, if the code breaks or returns an error use the instructions supplied by the catch statement instead.
// NOTE: findall() returns all records from a table in your database
    try {
        const travellerData = await Traveller.findAll();
// sends the status code of 200 to the browser and sends the travellerData with JSON formatting 
        res.status(200).json(travellerData);
    } catch (err) {
// in the case of an error the status of 500 will be sent and the json error will be sent
        res.status(500).json(err);
    }
});

// to GET a single traveller
router.get('/:id', async (req, res) => {
// So after the GET request has been made it TRYs the following code
// it will wait for travellerData to be defined before continuing
// here findbyPK() returns only entries that match a primary key
// the primary key is provided by req.params.id
    try {
        const travellerData = await Traveller.findByPk(req.params.id, {
// This line instructs sequelize to join traveller with Location through the TRIP table
// e.g. we get the locations associated with the id of a traveller through the link between the two tables
// SELECT * FROM traveller
// INNER JOIN trip ON traveller.id = trip.travellerId
// INNER JOIN location ON trip.locationId = location.id
// WHERE traveller.id = [id];
// So because there is no direct link between the two tables we select trip using the traveller id then location id, using trip.location id
// e.g. we select the location THROUGH Trip. So we have something like | Traveller.id | Trip.TravellerID | then this is used to link | trip. locationid | location.id
            include: [{ model: Location, through: Trip, as: 'planned_trips' }]
        });
// if the request is successful but there is no data for the traveller id it will return the error code 404 (requested resource not found)
// and send the message
        if (!travellerData) {
            res.status(404).json({ message: 'No traveller found with this ID!'});
            return;
        }
// otherwise if we have the data it will be formatted as json and sent out
        res.status(200).json(travellerData);
// otherwise the catch statement will print the error code. 
    } catch (err) {
        res.status (500).json(err);
    }
});

// CREATE a traveller

router.post('/', async (re, res) => {
    try {
// this will create traveller data using the create() method from sequelize. It will use the request.body as the parameter for creating the new traveller
// create takes in the JSON necessary to create a new instance of the required object and builds it, beofre saving it to the database
        const travellerData = await Traveller.create(req.body);
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
// uses the sequalize destroy() method
// it sends an object that uses a where key to insert into an SQL delete query (here it will delete WHERE id=?)
// the id here is provided by req.params.id
        const travellerData = await Traveller.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!travellerData) {
            res.status(404).json({ message: 'No traveller found with this id!' });
            return;
        }
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;