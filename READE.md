# Family Tree API

The **Family Tree API** is a Node.js application written in TypeScript using the Fastify framework. It provides a RESTful API for managing a family tree, including CRUD operations for users and their relationships (parents and children).

## Features
1. **Fastify Framework**: High-performance and lightweight web framework.
2. **Zod for Schema Validation**: Ensures data integrity and type safety.
3. **Swagger for API Documentation**: Automatically generated and interactive API documentation.
4. **Modular Structure**: Organized and scalable project structure.
5. **TypeScript**: Ensures code correctness and maintainability.
6. **Biome for Code Formatting and Linting**: Ensures code consistency and quality.
7. **Prisma for Database ORM**: Simplifies database interactions.


## Installation

Follow these steps to set up the project:

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the project directory:

   cd family-tree-api

3. Install dependencies using `pnpm`:

   pnpm install

4. Set up the database:

   pnpm prisma generate
   pnpm prisma migrate dev

5. Start the development server:

   pnpm dev


## Development Environment Setup

This project uses [Biome](https://biomejs.dev/) for code formatting and linting.

### Recommended Tools

- Use [VS Code](https://code.visualstudio.com/) as your editor.
- Install the recommended Biome extension: `biome.vscode`.


## API Endpoints

### People
- **GET /people**: Retrieve all people.
- **GET /people/:id**: Retrieve a user by ID.
- **POST /people**: Create a new user.
- **PUT /people/:id**: Update a user by ID (complete replacement).
- **PATCH /people/:id**: Update a user by ID (partial update).
- **DELETE /people/:id**: Delete a user by ID.

## Documentation

The API documentation is available via Swagger UI. Once the server is running, you can access it at:
```
http://localhost:3000/docs
```

## Future Enhancements

1. Add authentication (e.g., JWT).
2. Integrate with a database (e.g., PostgreSQL, MongoDB).
3. Expand relationship management to include grandparents, siblings, and other family members.
4. Implement advanced search and filtering for family trees.

---

Feel free to contribute or report issues to improve the Family Tree API! 🚀
