import React, { useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import "./BarcodeScanner.css";
import axios from 'axios';  // 📌 Make sure you install axios: npm install axios

const BarcodeScanner = () => {
  const fileInputRef = useRef(null);
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result;
      setPreview(reader.result);

      img.onload = async () => {
        const codeReader = new BrowserMultiFormatReader();
        try {
          const barcode = await codeReader.decodeFromImageElement(img);
          setResult(barcode.text);

          // 📤 Send barcode to server
          await saveBarcode(barcode.text);

        } catch (error) {
          setResult("❌ Barcode not detected.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const saveBarcode = async (code) => {
    try {
      const response = await axios.post('http://localhost:5000/api/barcodes', { code });
      setSaveMessage('✅ Barcode saved to database!');
    } catch (error) {
      setSaveMessage('❌ Failed to save barcode.');
      console.error(error);
    }
  };

  return (
    <div className="barcode-container">
      <h2>📷 Upload Barcode Image</h2>
      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
      {preview && <img src={preview} alt="Preview" className="barcode-preview" />}
      <p className="barcode-result"><strong>Result:</strong> {result}</p>
      {saveMessage && <p className="barcode-save-message">{saveMessage}</p>}
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
