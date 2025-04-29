// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import WarehouseDashboard from './components/warehouse/WarehouseDashboard';
// import ReportsPage from './components/report/ReportPage';
// import ShopPage from './components/ShopPage';
// import BarCode from './components/barcode/BarcodeScanner';
// // import OrderCard from './components/order/OrderCard';
// import OrderDetails from './components/order/OrderDetail';
// import OrderForm from './components/order/OrderForm';
// import OrderList from './components/order/OrderList';
// import OrderManagement from './components/order/OrderManagement';
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<WarehouseDashboard />} />
//          <Route path="/" element={<ShopPage/>}></Route>
//          <Route path="/" element={<BarCode/>}/>
//          <Route path="/ordermanagement" element={<OrderManagement />} />
//           <Route path="/ordermanagement/list" element={<OrderList />} />
//           <Route path="/ordermanagement/new" element={<OrderForm />} />
//           <Route path="/ordermanagement/:id" element={<OrderDetails />} />
//           <Route path="/ordermanagement/edit/:id" element={<OrderForm />} /> 
//         <Route path="/" element={<ReportsPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import WarehouseDashboard from './components/warehouse/WarehouseDashboard';
import ReportsPage from './components/report/ReportPage';
import ShopPage from './components/ShopPage';
import BarCode from './components/barcode/BarcodeScanner';
import OrderDetails from './components/order/OrderDetail';
import OrderForm from './components/order/OrderForm';
import OrderList from './components/order/OrderList';
import OrderManagement from './components/order/OrderManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<WarehouseDashboard />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/barcode" element={<BarCode />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path="/ordermanagement/list" element={<OrderList />} />
        <Route path="/ordermanagement/new" element={<OrderForm />} />
        <Route path="/ordermanagement/:id" element={<OrderDetails />} />
        <Route path="/ordermanagement/edit/:id" element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
