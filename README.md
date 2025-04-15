# Car Garage


## The Task

**Integrate the project with the DVLA API** to display detailed information about saved cars.

[**View Project Live**](https://car-garage-bay.vercel.app/)

## Fixes done and Updates

1. Instalation: After running `npm i` noticed lot of vulnarabilities then noticed that `react-scripts` and `vite` both present. Removed `react-scripts` updated the `vite` and other pakages.
2. Created a route for CarDetails.jsx
3. Fixed Garage.jsx and CarDetails.jsx
4. Styled neatly and mobile friendly
5. CI/CD with vercel and github (Preview on Pull request, Automatic deployments from main)
6. Save to localstorage the vaild and verified cars
7. Error displaying and error handeling 
8. Proxy on local dev and the vercel deployment uses serveless function to get DVLA data.
9. Custom hook to get DVLA data.

## Running the project 

```bash 
# copy .env.example to .env
cp .env.example .env

# modify the .env.example with the api key

# install 
npm i

# run dev
npm run dev
```

