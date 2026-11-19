// Cafe orders: aggregation practice (MongoDB / mongosh)
// Database: cafeDB | Collection: orders

use cafeDB;

// Sample data from the question. Order 3 is cancelled, matching the expected reports.
db.orders.insertMany([
  { _id: 1, customer: 'Meena',   item: 'Coffee',    qty: 2, price: 120, status: 'delivered' },
  { _id: 2, customer: 'Ravi',    item: 'Sandwich',  qty: 1, price: 180, status: 'delivered' },
  { _id: 3, customer: 'Meena',   item: 'Sandwich',  qty: 2, price: 180, status: 'cancelled' },
  { _id: 4, customer: 'Karthik', item: 'Coffee',    qty: 3, price: 120, status: 'delivered' },
  { _id: 5, customer: 'Ravi',    item: 'Coffee',    qty: 1, price: 120, status: 'delivered' },
  { _id: 6, customer: 'Meena',   item: 'Cake',      qty: 1, price: 250, status: 'delivered' },
  { _id: 7, customer: 'Karthik', item: 'Cake',      qty: 1, price: 250, status: 'pending' }
]);

// Task 1: Count orders by status.
db.orders.aggregate([
  {
    $group: {
      _id: '$status',
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// Task 2: Show delivered orders with only customer, item, and quantity.
db.orders.aggregate([
  { $match: { status: 'delivered' } },
  {
    $project: {
      _id: 0,
      customer: 1,
      item: 1,
      qty: 1
    }
  }
]);

// Task 3: Delivered quantity and revenue per item, highest revenue first.
db.orders.aggregate([
  { $match: { status: 'delivered' } },
  {
    $group: {
      _id: '$item',
      totalQty: { $sum: '$qty' },
      revenue: { $sum: { $multiply: ['$qty', '$price'] } }
    }
  },
  { $sort: { revenue: -1 } }
]);

// Task 4: Number of delivered orders and total spend per customer.
db.orders.aggregate([
  { $match: { status: 'delivered' } },
  {
    $group: {
      _id: '$customer',
      orders: { $sum: 1 },
      totalSpend: { $sum: { $multiply: ['$qty', '$price'] } }
    }
  },
  {
    $project: {
      _id: 0,
      customer: '$_id',
      orders: 1,
      totalSpend: 1
    }
  },
  { $sort: { totalSpend: -1 } }
]);

// Task 5: Return only the best customer from the Task 4 report.
db.orders.aggregate([
  { $match: { status: 'delivered' } },
  {
    $group: {
      _id: '$customer',
      orders: { $sum: 1 },
      totalSpend: { $sum: { $multiply: ['$qty', '$price'] } }
    }
  },
  {
    $project: {
      _id: 0,
      customer: '$_id',
      orders: 1,
      totalSpend: 1
    }
  },
  { $sort: { totalSpend: -1 } },
  { $limit: 1 }
]);
