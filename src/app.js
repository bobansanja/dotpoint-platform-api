const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const config = require("./config");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const db = require("./db"); // Import the database connection

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
// enable pre-flight
app.options("*", cors());

// Run migrations
async function runMigrations() {
    try {
        await db.migrate.latest(); // Run pending migrations
        console.log("Migrations executed successfully");
    } catch (error) {
        console.error("Error running migrations:", error);
        process.exit(1); // Exit the process if migrations fail
    }
}

runMigrations();

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const moduleResourceRoutes = require("./routes/moduleResourceRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/modules", moduleRoutes);
app.use("/resources", resourceRoutes);
app.use("/module-resources", moduleResourceRoutes);
app.use("/subscriptions", subscriptionRoutes);

// Swagger setup
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DotPoint Client API",
            version: "1.0.0",
            description: "Backend for DotPoint site users and content handling",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Development Server",
            },
            {
                url: "http://10.10.1.100:3000",
                description: "Remote",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT", // Set the bearer format if applicable
                },
            },
        },
        security: [{ BearerAuth: [] }],
    },
    apis: ["./src/routes/*.js"], // Path to the API routes
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
});

const { authenticateUser, checkResourcePreviewAccess } = require("./middleware/authMiddleware");
app.use(authenticateUser);
app.use("/static", checkResourcePreviewAccess, express.static("upload"));

// Start the server
const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
