const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/userModel");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("User Registration",() => {
    it("should register a new user" , async () => {
        const res = await request(app).post("/api/users/register").send({
            name : "Test User",
            email : "test@example.com",
            password : "password123"
        });

        const resData = res.body[0];
        expect(res.status).toBe(201);
        expect(resData.success).toBe(true);
        expect(resData).toHaveProperty("access_token");
        expect(resData).toHaveProperty("refresh_token");
        expect(resData.data).toHaveProperty("email", "test@example.com");
    });
});