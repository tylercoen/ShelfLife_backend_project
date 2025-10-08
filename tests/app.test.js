jest.setTimeout(30000);

const request = require("supertest");
const app = require("../src/app");
const { sequelize, User } = require("../src/models");
const { IGNORE } = require("sequelize/lib/index-hints");

let token;
let bookId;
let userBookId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
  await new Promise((resolve) => setTimeout(resolve, 500));
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
    const res = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${token}`)
      .send(testBook);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("book");
    expect(res.body.book).toHaveProperty("title", testBook.title);
    bookId = res.body.book.id;
  });

  it("GET /books -> should return all books", async () => {
    const res = await request(app)
      .get("/books")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.books)).toBe(true);
    expect(res.body.books.length).toBeGreaterThan(0);
  });

  it("PUT /books/:id -> should update the book details", async () => {
    const res = await request(app)
      .put(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Book Title" });

    expect(res.statusCode).toBe(200);
    expect(res.body.book).toHaveProperty("title", "Updated Book Title");
  });
});

describe("User-Books Endpoints (Reading Status)", () => {
  it("POST /user-books -> should add a book to the user's reading list", async () => {
    const res = await request(app)
      .post("/user-books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bookId: bookId,
        status: "reading",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("userBook");
    expect(res.body.userBook).toHaveProperty("status", "reading");
    userBookId = res.body.userBook.id;
  });

  it("GET /user-books -> should retrieve the user's reading list", async () => {
    const res = await request(app)
      .get("/user-books")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.userBooks)).toBe(true);
    expect(res.body.userBooks.length).toBeGreaterThan(0);
  });

  it("PUT /user-books/:id -> should update the reading status", async () => {
    const res = await request(app)
      .put(`/user-books/${userBookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "completed" });
    expect(res.statusCode).toBe(200);
    expect(res.body.userBook).toHaveProperty("status", "completed");
  });
});

describe("Reviews Endpoints", () => {});

describe("Cleanup", () => {
  it("DELETE /books/:id -> should delete the book", async () => {
    const res = await request(app)
      .delete(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /users/me -> should delete the logged-in user", async () => {
    const res = await request(app)
      .delete("/users/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
