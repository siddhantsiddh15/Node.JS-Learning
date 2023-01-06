const {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById} = require('../../models/launches.model');


async function httpGetAllLaunches(req, res){
    
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res){
    const launch = req.body;

    if(!launch.mission || !launch.rocket ||
        !launch.launchDate || !launch.target){
            return res.status(400).json({
                error: 'Missing required launch property'
            })
    }

    launch.launchDate = new Date(launch.launchDate);

    if(launch.launchDate.toString() === 'Invalid Date'){
        return res.status(400).json({
            error: "Invalid Date"
        })
    }

    if(isNaN(launch.launchDate) ){
        return res.status(400).json({
            error: "Invalid Date"
        })
    }

    // addNewLaunch(launch);
    await scheduleNewLaunch(launch)

    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res){
 const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId);

 // if launch does not exist
    if(!existLaunch){

        return res.status(404).json({
    error: 'Launch not found'
 })
}

 // if launch exists
    const aborted = await abortLaunchById(launchId)
//  return res.status(200).json(aborted)

    if(!aborted){
        res.status(400).json({
            error: 'Launch Not aborted'
        })
    }

    return res.status(200).json({
        ok:true
    })
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}