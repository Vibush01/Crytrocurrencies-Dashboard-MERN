<----Tech Stack ----> 
Frontend (Client)
React (with Vite) - npm create vite@latest .
Tailwind CSS (for styling) - npm i tailwindcss @tailwindcss/vite
Axios (for API requests) - npm i axios
dotenv (for environment variables) - npm install dotenv

Backend (Server)
Node.js
Express (for the REST API) - npm i express
Mongoose (for MongoDB object modeling) npm i mongoose
node-cron (for task scheduling) npm i node-cron
dotenv (for environment variables) - npm install dotenv

Database
MongoDB (using MongoDB Atlas) - created a project named (Crypto report and cluster with default name cluster0 and allowed access from anywhere )


<---- How Cron jobs are working ---->
The server uses node-cron to automatically manage data collection in server/automation/scheduler.js.

30-Minute Scheduler (*/30 * * * *):
This job runs every 30 minutes.
It fetches the latest data for the top 10 coins from the CoinGecko API.
It deletes all data in the CurrentData collection.
It inserts the new data.
This ensures the main dashboard always shows fresh, real-time data.

60-Minute Scheduler (0 * * * *):
This job runs at the start of every hour.
It fetches the latest data for the top 10 coins.
It appends this data as new documents into the HistoryData collection.
This creates a historical log of coin prices over time, which powers the "View History" feature and the manual "Save Snapshot" button.


screenshot - https://drive.google.com/drive/folders/18xOfKj4ShEcsKiQCw5ia49jDrq6dqYU1?usp=drive_link

Deployment
Frontend: Netlify - 
Backend: Render -