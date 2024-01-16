module.exports = {
    PORT: process.env.PORT || 3000,
    DB: {
        host: process.env.DB_HOST || "127.0.0.1",
        user: process.env.DB_USER || "dotpoint_app",
        password: process.env.DB_PASSWORD || "dotpoint_pass",
        database: process.env.DB_NAME || "dotpoint_demo",
        timezone: "+00:00",
        dateStrings: true
    },
    JWT_SECRET: process.env.JWT_SECRET || "jwt_test",
    JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || "30d"
};
