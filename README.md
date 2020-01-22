### Instructions

clone this repo:\
 `git clone`

enter the folder:\
 `cd trading-app`

Now you have to install the requirements for the backend and frontend and run them in separeted environments. Webpack will stick them together.

#### Backend

For the backend enter the backend folder\
`cd backend`\
create a virtual environment:\
`virtualenv -p python3 env`\
activate it:\
`source env/bin/activate`\
Now install the requirements:\
`pip -r install requirements.txt`\
Run the application:\
`python app.py`

Open your browser:
http://127.0.0.1:5000/

#### Frontend

Now open another tab, enter de frontend folder:\
`cd ../frontend`\
install the requirements:
`npm install`
After installed the dependencies you can run:\
`npm run build`\
This command will run webpack and generate static files for your production backend.
You can also run `npm run dev` while in development mode.\
Running:\
`npm run watch` you cand edit your frontend and have the files automatically updated in the backend. Just refresh your browser \*\* make sure that there is no cached files. Try a hard refresh.
