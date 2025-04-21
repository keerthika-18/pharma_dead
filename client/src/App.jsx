import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WarehouseDashboard from './components/warehouse/WarehouseDashboard';
// import ReportsPage from './components/report/ReportPage';
// import ShopPage from './components/ShopPage';
// import BarCode from './components/barcode/BarcodeScanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WarehouseDashboard />} />
         {/* <Route path="/" element={<ShopPage/>}></Route> */}
         {/*<Route path='/' element={<BarCode/>}></Route>*/}
        {/* <Route path="/" element={<ReportsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
