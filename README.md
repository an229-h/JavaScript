# Parking Lot Manager

A simple Parking Lot Management System built using JavaScript.

I made this project while learning JavaScript fundamentals such as arrays, objects, loops, functions, conditionals, and basic problem solving. The goal was to simulate a small parking lot and perform common operations on it.

## Features

- Park vehicles
- Remove vehicles
- Search vehicles
- Relocate vehicles
- View parking status
- View available slots
---





## Parking Lot Array

The parking lot is represented as an array of objects.

```javascript
[
    {
        slot: 1,
        occupied: false,
        vehicle: null
    },
    {
        slot: 2,
        occupied: true,
        vehicle: 112
    }
]
```

Each object stores:

* Slot number
* Occupancy status
* Vehicle number

---

## Functions

- **checkVehicle(carNumber)** – Finds a vehicle and returns its slot information.
- **parkCar(carNumber)** – Parks a vehicle in the first available slot.
- **removeCar(carNumber)** – Removes a vehicle from the parking lot.
- **searchCar(carNumber)** – Returns the slot number of a vehicle.
- **getStatus()** – Displays the status of all parking slots.
- **availableSlots()** – Lists all available slots and their count.
- **relocateCar(carNumber, newSlot)** – Moves a vehicle to another available slot.
---

## Time Complexity

| Function       | Complexity |
| -------------- | ---------- |
| checkVehicle   | O(n)       |
| parkCar        | O(n)       |
| removeCar      | O(n)       |
| searchCar      | O(n)       |
| getStatus      | O(n)       |
| availableSlots | O(n)       |
| relocateCar    | O(n)       |

---

## Project Structure

```text
project/
│
├── index.html
├── style.css
├── script.js
└── README.md
```
## What I Learned

While building this project, I practiced:

* Working with arrays of objects
* Using loops to search and update data
* Returning values from functions
* Object references in JavaScript
* Refactoring code to remove unnecessary loops
* Basic time complexity analysis
* Handling edge cases while moving and removing vehicles

---


### Development Livestreams

Part 1:
https://youtube.com/live/YhKsPQVTquo

Part 2:
https://youtube.com/live/i0lW_jgvhsM

Part 3:
https://youtube.com/live/7Z_EKS_ebJA

---

This project was built as part of my JavaScript learning journey.
