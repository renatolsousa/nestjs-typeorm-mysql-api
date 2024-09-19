<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Project template built over [Nest](https://github.com/nestjs/nest) framework TypeScript as a starter repository integrated with MySql via TypeOrm.

This project will cover:
 - NestJs
 - TypeOrm [MySql]
 - Nest Guards
 - Role Guards
 - Server Sent Events
 - Swagger Documentation
 - Authenticated Routes
 - User Registration
 - User Login


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger Api documentation

http://localhost:3000/docs


## Database Seeding
- By default, when the application starts, the **users/users.service.ts** will run **onModuleInit()** the **initDatabaseforUsage()** method that will populate the 2 first users for the system
```typescript
/**
* Change your user data here 
* or add more users if you want
* During the seeding the password will be encrypted by 
 - src/utils/password.bcrypt.ts
**/
export const usersSeeds = [
    {
        'firstName': 'Philip',
        'lastName': 'Banks',
        'email': 'philip.banks@gmail.com',
        'password': '123456',
        'role': 'admin'
    },
    {
        'firstName': 'George',
        'lastName': 'Banks',
        'email': 'george.banks@gmail.com',
        'password': '123456',
        'role': 'user'
    }
]
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Author
 - Renato Sousa - Renatão

## License

Nest is [MIT licensed](LICENSE).
