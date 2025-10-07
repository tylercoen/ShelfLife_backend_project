const request = require("supertest");
const app = require("../src/app");
const { sequelize, User } = require("../src/models");
const { IGNORE } = require("sequelize/lib/index-hints");

let token;
let bookId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  if (bookId) {
    (await request(app).delete(`books/${bookId}`)).set(
      "Authorization",
      `Bearer ${token}`
    );
  }
  if (token) {
    await request(app)
      .delete("/users/me")
      .set("Authorization", `Bearer ${token}`);
  }
  await sequelize.close();
});

describe("User Endpoints", () => {
  const testUser = {
    name: "TestUser",
    email: "testuser@example.com",
    password: "Password123!",
  };

  // POST /auth/register
  it("POST /auth/register -> should register a new user", async () => {
    const res = await request(app).post("/auth/register").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", testUser.email);
  });

  it("POST /auth/login -> should log in the user and return a token", async () => {
    const res = await request(app).post("/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("GET /users/me -> should return the logged-in user's profile", async () => {
    const res = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", testUser.email);
  });

  it("PUT /users/me -> should update the user's profile", async () => {
    const res = await request(app)
      .put("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "UpdatedUser" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Profile updated successfully");
    expect(res.body.user).toHaveProperty("name", "UpdatedUser");
  });
});

describe("Book Endpoints", () => {
  const testBook = {
    title: "Test Book",
    author: "Test Author",
    isbn: "1234567890",
    genre: "Fiction",
    publishedYear: 2025,
  };

  it("POST /books -> should create a new book", async () => {
    const res = (
      await request(app).post("/books").set("Authorization", `Bearer ${token}`)
    ).send(testBook);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("book");
    expect(res.body.book).toHaveProperty("title", testBook.title);
    bookId = res.body.book.id;
  });

  it("GET /books -> should return all books", async () => {
    const res = (await request(app).get("/books")).set(
      "Authorization",
      `Bearer ${token}`
    );

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.books)).toBe(true);
    expect(res.body.books.length).toBeGreaterThan(0);
  });

  // I never created these endpoints
  it("PUT /books/:id -> should update the book details", async () => {
    const res = await request(app)
      .put(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Book Title" });

    expect(res.statusCode).toBe(200);
    expect(res.body.book).toHaveProperty("title", "Updated Book Title");
  });
});
