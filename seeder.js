require("dotenv").config();
const mongoose = require("mongoose");

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const User = require("./models/user.model");
const Book = require("./models/book.model");


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(error => console.error("MongoDB connection error:", error));


// Clear existing collections
const clearDB = async () => {
  await User.deleteMany({});
  await Book.deleteMany({});
  console.log("Cleared existing users and books");
};

// Seed Users
const seedUsers = async () => {
  const users = [];
  for (let i = 0; i < 5; i++) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    users.push(new User({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: hashedPassword
    }));
  }
  const savedUsers = await User.insertMany(users);
  console.log("Seeded users");
  return savedUsers;
};

// Seed Books
const seedBooks = async (users) => {
  const books = [];
  for (let i = 0; i < 10; i++) {
    books.push(new Book({
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      userId: users[Math.floor(Math.random() * users.length)]._id
    }));
  }
  await Book.insertMany(books);
  console.log("Seeded books");
};

// Run Seeder
const runSeeder = async () => {
  await clearDB();
  const users = await seedUsers();
  await seedBooks(users);
  mongoose.connection.close();
  console.log("Seeding completed!");
};

runSeeder();