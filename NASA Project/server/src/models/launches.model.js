const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')
const launches = new Map();

const DEFAULT_FLIGHTNUMBER = 100

let latestFlightNumber = 100;

const launch = {
    flightNumber:100,
    mission: 'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate: new Date('December 27,2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

saveLaunch(launch)
// launches.set(launch.flightNumber, launch); No more in use

async function saveLaunch(launch){
    const planet = planets.findOne({
        keplerName: launch.target
    })

    if(!planet){
        throw new Error('No matching planet found');
        //
    }

    await launchesDatabase.updateOne({
        flightNumber : launch.flightNumber
    }, launch,{
        upsert: true
    })
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber');

    if(!latestLaunch){
        return DEFAULT_FLIGHTNUMBER;
    }

    return latestLaunch.flightNumber
}

async function existsLaunchWithId(launchId){
    return await launchesDatabase.findOne({
        flightNumber: launchId
    })
    // we will replace the use of map with mongoose
    // return launches.has(launchId)
}


async function getAllLaunches(){
    return await launchesDatabase.find({},{
        '_id':0, '__v':0
    })
    // return Array.from(launches.values())
}

async function scheduleNewLaunch(launch){

    const newFlightNumber = await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch,{
        success:true,
        upcoming:true,
        customer : ['ZTM', 'NASA'],
        flightNumber: newFlightNumber
    });

    await saveLaunch(launch);
}

// function addNewLaunch(launch){
    
//     latestFlightNumber++;

//     launches.set(
//         latestFlightNumber,
//         Object.assign(launch,
//             {customer: ['ZTM', 'NASA'],
//             upcoming: true,
//             success: true,  
//             flightNumber:latestFlightNumber})
//          )
// }

async function abortLaunchById(launchId){
    // const aborted = launches.get(launchId)

    // aborted.upcoming = false;
    // aborted.success = false;

    // return aborted;

    const aborted =  await launchesDatabase.updateOne({
        flightNumber :launchId
    },{
        upcoming:false,
        success:false
    });

    return aborted.ok === 1 && aborted.nModified === 1
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}