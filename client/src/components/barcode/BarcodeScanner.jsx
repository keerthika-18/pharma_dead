import React, { useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import axios from 'axios';
import './BarcodeScanner.css';

const BarcodeScanner = () => {
  const [scanned, setScanned] = useState('');
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(null, 'barcode-video', async (result, err) => {
      if (result && !hasScanned) {
        const code = result.getText();
        setScanned(code);
        setHasScanned(true);

        try {
          await axios.post('http://localhost:5000/api/barcodes', { code });
          console.log('Saved to DB:', code);
        } catch (error) {
          console.error('Save failed:', error);
        }

        codeReader.reset();
      }
    });

    return () => {
      codeReader.reset();
    };
  }, [hasScanned]);

  return (
    <div className="scanner-container">
      <h2>Scan Barcode</h2>
      <div className="video-wrapper">
        <video id="barcode-video" className="barcode-camera" />
        <div className="barcode-highlight" />
      </div>
      {scanned && <p>✅ Scanned: <strong>{scanned}</strong></p>}
    </div>
  );
};

export default BarcodeScanner;

// import React, { useEffect, useRef, useState } from 'react';
// import { BrowserMultiFormatReader } from '@zxing/browser';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// import './BarcodeScanner.css';

// const BarcodeScanner = () => {
//   const webcamRef = useRef(null);
//   const [scannedData, setScannedData] = useState('');
//   const [hasScanned, setHasScanned] = useState(false);

//   useEffect(() => {
//     const codeReader = new BrowserMultiFormatReader();

//     codeReader.decodeFromVideoDevice(null, 'video', async (result, err) => {
//       if (result && !hasScanned) {
//         const code = result.getText();
//         setScannedData(code);
//         setHasScanned(true);

//         // Save to backend
//         try {
//           await axios.post('http://localhost:5000/api/barcodes', { code });
//           console.log('Scanned & Saved:', code);
//         } catch (error) {
//           console.error('Save failed:', error);
//         }

//         codeReader.reset(); // stop scanning after success
//       }
//     });

//     return () => {
//       codeReader.reset();
//     };
//   }, [hasScanned]);

//   return (
//     <div className="scanner-container">
//       <h2>Barcode Scanner</h2>
//       <div className="scanner-wrapper">
//         <video id="video" className="webcam" />
//         <div className="scan-zone" />
//       </div>
//       {scannedData && <p><strong>Scanned:</strong> {scannedData}</p>}
//     </div>
//   );
// };

// export default BarcodeScanner;
