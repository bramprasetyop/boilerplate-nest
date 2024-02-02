# BOILER PLATE NESTJS

## Introduction

This readme provides detailed instructions for setting up and running a NestJS application. Ensure that you have Node.js version 18 and above installed on your machine.

## Installation

To install the necessary dependencies, run the following command:

```bash
yarn install
```

## ENV File

For adding the environment file with dependencies, please refer to the following repository: [Credential Repo](https://gitsource.myequity.id/MKO/test-folder-deploy/tree/external/be-api-boilerplate-nest/api-boilerplate-nest)

## Run Locally

To run the NestJS application locally, execute the following command:

```bash
yarn run start:dev
```

This will start the development server, and your application will be accessible at: [localhost:3000](http://localhost:3000/) or you can modify it in `.env` file

## Run Using Docker Locally

- Edit the Dockerfile.dev file.

- Fill in the values for ARG USERNAME and ARG PASSWORD. These values are used for authentication within the Docker environment.

- Save the changes to the Dockerfile.dev file.

- Run the following command to build and run the Docker container:

```bash
yarn run docker:dev
```

This command will build the Docker image and start the containerized application. Access your application at [localhost:3000](http://localhost:3000/) within the Docker environment.

Note: Ensure that Docker is installed on your machine before running the Docker commands.

## Additional Information

Feel free to customize the application further based on your specific requirements. For more information about NestJS, refer to the [Official Documentation](https://nestjs.com/)
