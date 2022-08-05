# Prerequisites
First, you must have docker and git installed.

## Installation
Run these commands:

### Download the API
`git clone https://github.com/jspranklemusic/sample-rails-react-crud-server.git`
### Download the Client
`git clone https://github.com/jspranklemusic/sample-rails-react-crud-client.git`
### Run the docker containers
`cd sample-rails-react-crud-client && docker-compose up --build`

## Notes

### Issues/things I would improve
This is a test project to use Ruby on Rails, Docker, and React together for a coding challenge. Functionally, it works as intended, but there are many pieces of code that should be altered in order to make this application production ready. For instance, the client accesses a hard-coded port 3000, whereas it should use environment variables to get the value dynamically. Additionally, instead of searching each individual attribute in the /view page, there is a JSON.stringify search method that is computationally expensive and inefficient.

In the API, it would be standard to implement pagination and limiting in the index method of the *job_hazard_analyses.rb* controller instead of returning every object.

### Things that work

- Viewing all job hazard analsyes
- Editing a job hazard analysis
- Creating a job hazard analysis
- Deleting a job hazard analysis
- Sorting by date
- Filtering items with a text search
- Error handling
- Alerts
- Confirm dialog (for deletion)
- Redux 
- Single page application routing w/ React router 
- Login
- Registration
- Session login persistence with Json Web Tokens (JWT)
- Basic Docker compose setup
