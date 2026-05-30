const TOTAL_SLOTS = 6;

let parkingLot = [
    { slot: 1, occupied: false, vehicle: null },
    { slot: 2, occupied: false, vehicle: null },
    { slot: 3, occupied: true, vehicle: 112 },
    { slot: 4, occupied: false, vehicle: null },
    { slot: 5, occupied: true, vehicle: 108 },
    { slot: 6, occupied: false, vehicle: null },
];


function checkVehicle(carNumber) {
    for (let slot of parkingLot) {
        if (slot.vehicle === carNumber) {
            return slot;
        }
    }
    return false;
}

function parkCar(carNumber) {
    let exist = checkVehicle(carNumber)
    if (exist === false) {
        //Proceed to park
        for (let slot of parkingLot) {
            if (slot.occupied === false) {
                slot.vehicle = carNumber
                slot.occupied = true;
                return `Vehicle ${carNumber} is now parked at ${slot.slot}`
            }
        }
        return "All slots are currently full"
    } else {
        return `Vehicle ${carNumber} is already parked at ${exist.slot}`
    }
}

function removeCar(carNumber) {
    if(checkVehicle(carNumber)=== false) {
        return `Car ${carNumber} not found`
    } else{
        for(let slot of parkingLot) {
            if(slot.vehicle===carNumber){
                slot.vehicle=null;
                slot.occupied=false;
                return `Car ${carNumber} has been remove from slot ${slot.slot}`
            }
        }
    }
}

function searchCar(carNumber) {
    vehicleLocation = checkVehicle(carNumber);
    if(vehicleLocation===false){
        return `car ${carNumber} not found`
    } else {
        return `The vehicle is at slot ${vehicleLocation.slot}`;
    }
}

function getStatus(){
    for(let slot of parkingLot){
        if(slot.occupied===true){
            console.log(`slot:${slot.slot}\nstatus:occupied\nvehicle:${slot.vehicle}`)
        } else {
            console.log(`slot:${slot.slot}\nstatus:empty`)
        }
    }
}

function availableSlots(){
    for(let slot of parkingLot){
        if(slot.occupied===false){
            console.log(slot.slot)
        }
    }
}

function relocateCar(carNumber, newSlot){
    let exist = checkVehicle(carNumber)
    if(exist===false){
        return `${carNumber} doesn't exist in our parking lot`
    } else {
        let relocated;
        for(let slot of parkingLot){
            if(slot.slot===newSlot && slot.occupied===false){
                slot.occupied=true;
                slot.vehicle=carNumber;
                relocated = true;
            }
        }
        for(let slot of parkingLot){
            if(slot.slot==exist.slot && relocated===true){
                slot.occupied=false;
                slot.vehicle=null; 
                return  'Car relocated successfully'
            }
        }
        return "Car hasn't been relocated"
    }
}