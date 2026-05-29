const TOTAL_SLOTS = 6;

let parkingLot = [
    { slot: 1, occupied: false, vehicle: null },
    { slot: 2, occupied: false, vehicle: null },
    { slot: 3, occupied: true, vehicle: 112 },
    { slot: 4, occupied: false, vehicle: null },
    { slot: 5, occupied: false, vehicle: null },
    { slot: 6, occupied: false, vehicle: null },
];


function checkVehicle(carNumber) {
    for (let slot of parkingLot) {
        if (slot.vehicle === carNumber) {
            return slot.slot;
        }
    }
    return false;
}

function parkCar(carNumber) {
    if (checkVehicle(carNumber) === false) {
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
        return `Vehicle ${carNumber} is already parked at ${checkVehicle(carNumber)}`
    }
}
