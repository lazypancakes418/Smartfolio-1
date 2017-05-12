# Project Name

Smartfolio

## Team

  - __Product Owner__: Michelle Carter
  - __Scrum Master__: RJ Mohammad
  - __Development Team Members__: Michelle Carter, RJ Mohammad

## Table of Contents

1. [Dev Issues](#dev-issues)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Dev Issues
-The images that get saved in the database are stored in an uploads folder, so you will need to create that in your repo.
-In the server folder, there is a zip file called lib.zip. You must unzip this before deploying or pushing your app to github. The lib folder holds the Angular Modal Service information which needs to NOT be pushed to github. This lib folder is already in the .gitignore file.
-The app will NOT RUN unless you set up IBM Watson API keys. You will need to set up environment variables in terminal for this information. The variables are referenced in the watson.js file.
  -If you want to work on the application without Watson functionality you can comment out the lines in the server file where the watson file is required and where the setInterval function is called.
-Note that the app currently will successfully deploy to AWS Elastic Beanstalk only occasionally, so deploying is an issue.
-There are environment variables for running a mySQL database from Amazon RDS. The schemas for the database are commented out in the config.js file.
-We do not yet have Update functionality for the images. Delete IS working.

## Development


### Installing Dependencies

see package.json file/run npm install

### Roadmap

-Additional functionality to consider for version 2.0
  -We intended to provide an optional description field in place of a second image. The database is built to store that field, but there are several front-end issues that would need to be overcome.
  -Add an albums page, with the ability to add multiple images to an album and for users to have multiple albums.
  -Add a social networking feature where users can share their albums with friends. This functionality has NOT been built into the database.
  -Strengthen the IBM Watson features by teaching Watson how to recognize emotions and then maybe enhance albums with AI functionality that would choose songs to play when viewing specific images, based on the emotion or content of the images.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
