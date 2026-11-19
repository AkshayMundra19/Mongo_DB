# MongoDB Practical Scripts

This repository contains MongoDB practical exercises for a 2nd Mid Term assignment. Both scripts are written for the MongoDB JavaScript shell and demonstrate CRUD operations and aggregation queries.

## Repository Contents

| File | Description |
|---|---|
| `cafe_orders_sales_reports_and_aggregation.js` | Creates cafe orders and demonstrates aggregation for status counts, delivered orders, item sales, customer spending, and top customer. |
| `library_books_updates_upserts_and_delete.js` | Creates a library books collection and demonstrates updates with `$inc`, upsert operations, and deletions. |

## 1. Cafe Orders and Sales Reports

Run `cafe_orders_sales_reports_and_aggregation.js` in MongoDB Shell:

```javascript
mongosh
load("cafe_orders_sales_reports_and_aggregation.js")
```

The script:

- Uses the `cafeDB` database.
- Inserts cafe orders into the `orders` collection.
- Counts orders by status.
- Lists delivered orders.
- Calculates quantity sold and revenue for each item.
- Calculates the total spend of each customer.
- Finds the highest-spending customer.

### Example Aggregations

The script uses MongoDB aggregation stages such as:

- `$match` to filter delivered orders.
- `$group` to calculate totals.
- `$project` to format output fields.
- `$sort` to arrange results.
- `$limit` to return the top result.
- `$multiply` and `$sum` to calculate revenue and spending.

## 2. Library Book Updates

Run `library_books_updates_upserts_and_delete.js` in MongoDB Shell:

```javascript
mongosh
load("library_books_updates_upserts_and_delete.js")
```

The script:

- Creates the `libraryDB` database and `books` collection.
- Inserts initial book records.
- Increases and decreases stock using `$inc`.
- Inserts a book with `upsert: true` if it does not already exist.
- Updates book stock and status.
- Deletes unavailable, damaged, or lost books.
- Lists the remaining books sorted by title.

### MongoDB Operations Used

- `insertMany()`
- `updateOne()`
- `upsert`
- `$inc`
- `$set`
- `$in`
- `deleteOne()`
- `deleteMany()`
- `find()`
- `sort()`

## Requirements

- MongoDB Server
- MongoDB Shell (`mongosh`)

## How to Run

1. Start MongoDB:

```bash
mongosh
```

2. Run the cafe script:

```javascript
load("cafe_orders_sales_reports_and_aggregation.js")
```

3. Run the library script:

```javascript
load("library_books_updates_upserts_and_delete.js")
```

## Purpose

This repository is a collection of MongoDB practical exercises covering basic CRUD operations, update operators, upserts, deletes, and aggregation pipelines.
