// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const warehouseRoutes = require('./routes/warehouseRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB directly
// mongoose.connect('mongodb://localhost:27017/Deadstock', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// // Routes
// app.use('/api/warehouse', warehouseRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const warehouseRoutes = require('./routes/warehouseRoutes');
const reportRoutes = require('./routes/reportRoutes');
const expiryRoutes = require('./routes/expiryRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Deadstock', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/warehouse', warehouseRoutes);
app.use('/api/reports', reportRoutes);      // New: Reports API
app.use('/api/expiry', expiryRoutes); 
 app.use('/api/orders', orderRoutes);  
     // New: Expiry prediction API
const barcodeRoutes = require('./routes/barcodeRoutes');
app.use('/api/barcodes', barcodeRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Pharma Dead Stock Management API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
