# Car Garage


## The Task

**Integrate the project with the DVLA API** to display detailed information about saved cars.

### Requirements:

- For every car registration plate stored in the system, **fetch and display as much information as possible** from the DVLA API.
    - At a minimum, show the **make**, **model**, **year**, and an **image** of the vehicle.
  
- The UI should:
    - **Display all saved cars**.
    - Allow users to **add new cars**, **delete saved cars**, and **view more details** for each one.
    - Handle and display **errors gracefully** if the DVLA API integration fails.
    - Be **styled neatly**.
  
- **Bonus**: Ensure the app is **mobile-friendly/responsive**.

### Constraints:
- Only **valid and verified** registration plates should be stored in the saved list.
- The codebase contains **bugs and incomplete sections** — these must be identified and fixed.


---

## Fixes done

1. Instalation: After running `npm i` noticed lot of vulnarabilities then noticed that `react-scripts` and `vite` both present. Removed `react-scripts` updated the `vite` and other pakages.
2. Created a route for CarDetails.jsx
3. Fixed Garage.jsx and CarDetails.jsx
