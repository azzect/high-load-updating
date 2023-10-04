## Get Started

In this repository is solution of the problem [En](./TASK_EN.md) [Ru](./TASK_RU.md)
#### Prerequisites

You need to install:

1. [Git](https://www.atlassian.com/git/tutorials/install-git#linux)
2. [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
3. [Docker-compose](https://docs.docker.com/compose/install/)
4. [Nvm](https://github.com/nvm-sh/nvm#install--update-script) or Node.js v18.18.0

#### Set up a development server

1. Clone the repository
2. Project uses Node.js v18.18.0. You can run `nvm install` or `nvm use` in the root of the project if `Nvm` is on your computer.
3. Run `npm ci` in the root of project
4. For fast starting `docker-compose.yaml` and `.env` have the same values. If you will change environment variables don't forget update another file

#### First run server

1. Init database with `docker compose up -d`
2. Run `npx sequelize-cli db:migrate` for creating table in database
3. Run `npx sequelize-cli db:seed:all` for creating initial values
4. Run `npm run start` for start server

#### Ordinary run server
1. Run database with `docker compose up -d` or some of docker's client
2. Run `npm run start` for start server

#### Testing

For testing used `fetchUpdatingRequests.js`. Run script `npm run fetching [userId]` where `[userId]` is id of user which balance  will change