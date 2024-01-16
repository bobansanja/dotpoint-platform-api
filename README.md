# DotPoint Platform API

The DotPoint Platform API serves as the backend for the [DotPoint Client Platform](https://github.com/bobansanja/dotpoint-client-platform), managing user authentication, product and module creation, resource handling, and subscription management. It utilizes a MySQL database for data storage and follows modern practices.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)

## Features

- **User Management**: Register new users, handle user login, and provide JWT tokens for authentication.
- **Product and Module Handling**: Create, update, and retrieve information about products and modules available on the platform.
- **Resource Management**: Upload, update, and delete resources such as PDFs, images, and videos.
- **Subscription Management**: Allow users to subscribe to products and manage their subscriptions.
- **Security**: Utilize JSONWebToken for secure authentication and authorization.

## Getting Started

### Prerequisites

- Node.js _( version >= 18 )_
- MySQL _( MariaDB flavor preferred )_
- Docker _( for running MySQL + PHPMyAdmin )_

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/dotpoint_platform_api.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the MySQL database using Docker:

   ```sh
   docker compose up -d
   ```

### Usage

To run the DotPoint Platform API locally, use the following command:

```sh
npm start
```

For development with automatic restart on code changes, use:

```sh
npm run dev
```

## API Documentation

The API documentation is available using Swagger. You can access the documentation by visiting the `/api-docs` endpoint when the server is running.

When running locally Swagger UI is available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs), while Swagger JSON spec is available at [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)

The API provides the following functionalities:

- Module-Resource associations
- CRUD operations on Modules
- CRUD operations on Products
- CRUD operations on Resources
- CRUD operations on Subscriptions
- User registration and authentication

## Environment Variables

Default values for following variables will be set upon application start, unless provided.

- `DB_HOST`: Database host URL
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret key for JSON Web Token
- `JWT_EXPIRE_IN`: Validity for issued JSON Web Token
- `PORT`: Port number for the API

You can use a tool like `dotenv` to manage these variables during development or through docker injections.
