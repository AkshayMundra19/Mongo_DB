db = db.getSiblingDB("libraryDB");

db.books.drop();
db.books.insertMany([
  { _id: 1, title: "Database Systems", author: "Elmasri", copies: 5, status: "available" },
  { _id: 2, title: "Operating Systems", author: "Galvin", copies: 3, status: "available" },
  { _id: 3, title: "Computer Networks", author: "Tanenbaum", copies: 0, status: "unavailable" },
  { _id: 4, title: "Old Almanac 1990", author: "Unknown", copies: 0, status: "unavailable" },
  { _id: 5, title: "Torn Notes", author: "Unknown", copies: 0, status: "damaged" },
  { _id: 6, title: "Water-damaged Atlas", author: "Unknown", copies: 1, status: "damaged" }
]);

print("Task 1: Add two copies of Operating Systems");
printjson(db.books.updateOne(
  { title: "Operating Systems" },
  { $inc: { copies: 2 } }
));

print("Task 2: Reduce Database Systems stock by one");
printjson(db.books.updateOne(
  { title: "Database Systems", copies: { $gt: 0 } },
  { $inc: { copies: -1 } }
));

const artificialIntelligenceUpsert = () => db.books.updateOne(
  { title: "Artificial Intelligence" },
  {
    $set: { author: "Russell", copies: 4, status: "available" }
  },
  { upsert: true }
);

print("Task 3: First upsert of Artificial Intelligence (inserts)");
printjson(artificialIntelligenceUpsert());
print("Task 3: Second upsert of Artificial Intelligence (no duplicate)");
printjson(artificialIntelligenceUpsert());

print("Task 4: Update Computer Networks stock and status");
printjson(db.books.updateOne(
  { title: "Computer Networks" },
  {
    $inc: { copies: 3 },
    $set: { status: "available" }
  }
));

print("Task 5: Delete Old Almanac 1990");
printjson(db.books.deleteOne({ title: "Old Almanac 1990" }));

print("Task 6: Delete damaged or lost books");
printjson(db.books.deleteMany({ status: { $in: ["damaged", "lost"] } }));

print("Task 7: Remaining books (title and copies, sorted by title)");
printjson(db.books.find(
  {},
  { _id: 0, title: 1, copies: 1 }
).sort({ title: 1 }).toArray());
