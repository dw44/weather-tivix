# Weather Application
## Live: https://weather-tivix.vercel.app/

## To run app locally:
- It is strongly advised that the app be run from the live link to avoid compatibility/dependency related issues.
- Clone this repository.
- Open directory in command line and run "npm install"
- create a '.env.local' file and create a variable called 'NEXT_PUBLIC_API_KEY', setting it's values to an openweather API key.
- Run the command "npm run build".
- Followed by "npm start".
- Access the app on localhost:3000.

## Information:
- The DataTracker class is in the 'utils' directory.
- The DataTracker is used in the DailyForecast component to track various datasets.
- City and country fields cannot be empty or search won't query the api.