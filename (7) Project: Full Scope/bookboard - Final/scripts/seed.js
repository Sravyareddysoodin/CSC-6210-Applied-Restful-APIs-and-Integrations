import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    status: "Completed",
    coverImageUrl: "/great-gatsby-book-cover.png",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    status: "Reading",
    coverImageUrl: "/1984-book-cover.png",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    status: "To Read",
    coverImageUrl: "/to-kill-a-mockingbird-cover.png",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    status: "Completed",
    coverImageUrl: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    status: "To Read",
    coverImageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classic",
    status: "Reading",
    coverImageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    status: "Completed",
    coverImageUrl: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=600&fit=crop",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    status: "Reading",
    coverImageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    status: "To Read",
    coverImageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    status: "Completed",
    coverImageUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    status: "Reading",
    coverImageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    status: "To Read",
    coverImageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    status: "Completed",
    coverImageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    status: "Reading",
    coverImageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    status: "To Read",
    coverImageUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&h=600&fit=crop",
  },
]

async function seedDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    console.log("Connecting to MongoDB...")
    await client.connect()
    console.log("Connected successfully!")

    const db = client.db("bookboard")
    const booksCollection = db.collection("books")

    // Clear existing data
    console.log("Clearing existing books...")
    await booksCollection.deleteMany({})
    console.log("Existing books cleared!")

    // Insert sample books
    console.log("Inserting sample books...")
    const result = await booksCollection.insertMany(sampleBooks)
    console.log(`Successfully inserted ${result.insertedCount} books!`)

    // Display inserted books
    console.log("\nInserted books:")
    sampleBooks.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} by ${book.author} - ${book.status}`)
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  } finally {
    await client.close()
    console.log("\nDatabase connection closed.")
  }
}

seedDatabase()
