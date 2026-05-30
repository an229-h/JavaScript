let parkingLot = [
    { slot: 1, occupied: false, vehicle: null },
    { slot: 2, occupied: false, vehicle: null },
    { slot: 3, occupied: true, vehicle: 112 },
    { slot: 4, occupied: false, vehicle: null },
    { slot: 5, occupied: true, vehicle: 108 },
    { slot: 6, occupied: false, vehicle: null },
];

function checkVehicle(carNumber) {
    if(!carNumber){
        return "Invalid Car Number Entered"
    }
    for (let slot of parkingLot) {
        if (slot.vehicle === carNumber) {
            return slot;
        }
    }
    return false;
}

function parkCar(carNumber) {
    if(!carNumber){
        return "Invalid Car Number Entered"
    }
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
    if(!carNumber){
        return "Invalid Car Number Entered"
    }
    let vehicle = checkVehicle(carNumber)
    if(vehicle=== false) {
        return `Car ${carNumber} not found`
    } else{
        vehicle.vehicle=null;
        vehicle.occupied=false;
        return `Car ${carNumber} has been removed from slot ${vehicle.slot}`
    }
}

function searchCar(carNumber) {
    if(!carNumber){
        return "Invalid Car Number Entered"
    }
    let vehicleLocation = checkVehicle(carNumber);
    if(vehicleLocation===false){
        return `car ${carNumber} not found`
    } else {
        return `The vehicle is at slot ${vehicleLocation.slot}`;
    }
}

function getStatus() {
  let output = "";
  for (let slot of parkingLot) {
    if (slot.occupied === true) {
      output += `slot:${slot.slot}
status:occupied
vehicle:${slot.vehicle}

`;
    } else {
      output += `slot:${slot.slot}
status:empty

`;
    }
  }
  return output;
}

function availableSlots(){
    let count=0
    let output=""
    for(let slot of parkingLot){
        if(slot.occupied===false){
            output+=`${slot.slot}\n`
            count++;
        }
    }
    return `Total available slots - ${count}\n${output}`
}

function relocateCar(carNumber, newSlot) {
    if(!carNumber || !newSlot){
        return "Invalid Car Number Entered"
    }
    let exist = checkVehicle(carNumber)
    if (exist === false) {
        return `${carNumber} doesn't exist in our parking lot`
    } else if (newSlot === exist.slot) {
        return "Vehicle is already in that slot"
    } else {
        let relocated = false;
        for (let slot of parkingLot) {
            if (slot.slot === newSlot && slot.occupied === false) {
                slot.occupied = true;
                slot.vehicle = carNumber;
                relocated = true;
                break;
            }
        }
        if (relocated) {
            exist.occupied = false;
            exist.vehicle = null;
            return "Car relocated successfully"
        }
    }
    return "Car hasn't been relocated"
}
