# Strive
"Social pressure" based productivity/task app written in Python/Django and React. Add varying levels of tasks, complete tasks to earn in-app points. Wager points against friends' tasks. Spend points on new avatars and to unlock reactions and more (soon to come).

## Authors
  * [Mick Johnson](https://github.com/mickajohnson)
  * [Michael Mitchell](https://github.com/mikeybags)
  * [Curtis Wulfsohn](https://github.com/cwulfsohn)

## Technologies
  * Python
  * Django
  * SQLite3, to be MySQL when completed.
  * React
  * Redux
  * SASS/SCSS
  * JQuery

## Dependencies
Python Dependencies
  ```
  bcrypt==3.1.2
  cffi==1.9.1
  Django==1.10.5
  django-extensions==1.7.5
  django-webpack-loader==0.4.1
  MySQL-python==1.2.5
  mysqlclient==1.3.9
  olefile==0.44
  Pillow==4.0.0
  pycparser==2.17
  pydot==1.2.3
  pydotplus==2.0.2
  pygraphviz==1.5.dev0
  pyparsing==2.1.10
  pytz==2016.10
  six==1.10.0
 ```
NPM Dependencies
 ```
 "awesome-react-date": "^0.3.0",
 "axios": "^0.16.1",
 "babel-preset-stage-1": "^6.1.18",
 "django-react-csrftoken": "^1.0.1",
 "js-cookie": "^2.1.4",
 "lodash": "^3.10.1",
 "moment": "^2.18.1",
 "react": "^0.14.3",
 "react-bootstrap": "^0.30.10",
 "react-datepicker": "^0.46.0",
 "react-dom": "^0.14.3",
 "react-dropzone": "^3.13.0",
 "react-emoji-picker": "^1.0.13",
 "react-emoji-react": "^0.3.0",
 "react-redux": "4.0.0",
 "react-router": "^2.0.0-rc5",
 "react-sparklines": "^1.6.0",
 "react-tabs": "^0.8.3",
 "react-transition-group": "^1.1.2",
 "recharts": "^0.22.3",
 "redux": "^3.0.4",
 "redux-cookie": "^0.5.9",
 "redux-form": "^4.1.3",
 "redux-promise": "^0.5.3",
 "redux-react-session": "^1.1.2"
 ```

## To Run Project Locally

* Clone the project
  ```
    git clone https://github.com/mikeybags/strive.git
  ```
* Move into project directory
  ```
    cd strive
  ```
* Install NPM Dependencies
  ```
    npm install
  ```
* Create and start a a virtual environment
  ```
    virtualenv env --no-site-packages
    source env/bin/activate
  ```
* Instally Python Dependencies
  ```
    pip install -r requirements.txt
  ```
* Migrate
  ```
    python manage.py migrate
  ```
* Start the server
  ```
    python manage.py runserver
  ```
* (In another terminal tab) Start webpack
  ```
    webpack -w
  ```
* Open localhost:8000 on your browser to view the app
