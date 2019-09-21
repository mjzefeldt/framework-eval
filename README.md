# README

## Framework Evaluator

### Description
Application continuously displays and updates frontend framework repository usage/issue data available via the GitHub API v3. Users must login (authenticate) to view framework repo data and vote for the best framework based on the available data. App limits voting to unique email per session. The frontend frameworks presented are React, Angular, Ember, and Vue.

### Installation
* Ruby 2.6.0 
* Rails 5.2.1
* Node v8.16.1
* Rails-React
* Redux
* Webpacker
* PostgreSQL
* dotenv
* Devise
* Semantic-UI React
* Heroku for deployment
* rails new framework-eval --database=postgresql --webpack=react

Regarding gem 'dotenv-rails' (for env file) - make sure to add to gitignore.
If new to configuring rails-react, this article is helpful for basic setup: https://www.freecodecamp.org/news/how-to-create-a-rails-project-with-a-react-and-redux-front-end-8b01e17a1db/.

### Project Status & Challenges
**Continuously retrieving framework repo data updates sans page refresh**
Used Fetch API to make ajax calls to Github API v3. Paired Redux with React to persist and hydrate state upon each ajax request made to Github API. Opted to use polling to continuously check for repo updates, every 10 seconds, via a setInterval call initiated in componentDidMount lifecycle method for Dashboard component. To attain a higher rate limit and avoid immediate issues with polling, used dotenv module via webpacker to include secret token to make Github API calls.

**Authorization and user voting**
Leveraged devise library to authenticate user and retrieve unique email. Leveraged Rails session tracking to limit user vote to once per session. Upon successful post/creation of vote for a framework, added a vote check property to session within frameworks_controller. Experienced difficulty configuring devise to properly route.

**Retrieving framework votes**
Also leveraged Fetch APi, Redux, and React to retrieve vote totals for each displayed framework. Added vote total information to framework data for display by mapping over github framework data within Dashboard component. Ensured immediate rendering without need of page refresh by taking care to provide a starting structure state.

**Schema**
User can vote many times and each vote belongs to one user.  A vote will belong to one framework and a framework can have many votes.  Framework vote total calculated when user posts new vote in active record callback, after_commit. Schema is tightly coupled to current project and would need adjustments to scale to other types of voting rounds as an example.

**Ul Design - Sorting Frameworks and Grid Presentation**
Overall framework data layout is inspired by pricing page ui psychology, present the data side by side so clear differences between frameworks and which data belongs to which framework. Implemented sorting option for user to visually rank frameworks according to four data fields: Fork Count, Watcher Count, Open Issues Count, and the total votes from Framework Evaluator users thus far. Data fields were chosen as proxies for: forks => actual usage, watchers => trending interest, issues => potential stability or flexibility issues, votes => how other users are digesting data. 

### Next Steps
Revisit polling implementation  - explore whether webhooks are available for public use, whether can make use Redux Sagas and ETags.
Revisit Devise and authorization flow.

