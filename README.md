
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Blog Post Site

## Description
This a blog where developers can publish posts, and comment on others' posts. This app follows the MVC paradigm in its architectural structure, uses Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contribution](#contribution)
* [Tests](#tests)
* [Questions](#questions) 
  
## Installation
[MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect the Express.js API to a MySQL database.
[express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views
[dotenv](https://www.npmjs.com/package/dotenv) package to use environment variables to store sensitive data.packages. 
[bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords
[express-session](https://www.npmjs.com/package/express-session) and [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication.

**Note**: The [express-session](https://www.npmjs.com/package/express-session) package stores the session data on the client in a cookie. When you are idle on the site for more than a set time, the cookie will expire and you will be required to log in again to start a new session. This is the default behavior and you do not have to do anything to your application other than implement the npm package.

## Usage
When you sign in or sign up, you can view existing posts, leave comments, add a new blog post, and delete or update posts and comments.

## License
This project is licensed under  MIT.
Read more about [MIT](https://opensource.org/licenses/MIT).

## Questions
Find me on Github: [EmeraldAGreen](https://github.com/EmeraldAGreen)

Email me with additional questions: emeraldthedeveloper@gmail.com