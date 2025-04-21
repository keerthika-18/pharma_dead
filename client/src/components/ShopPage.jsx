import React from 'react';
import './ShopPage.css';

const medicines = [
  { id: 1, name: 'Paracetamol 500mg', price: 25, image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/HR/CZ/QW/6918745/paracetamol-500mg-tablets-intemol-500-2-.jpeg' },
  { id: 2, name: 'Amoxicillin 250mg', price: 45, image: 'https://5.imimg.com/data5/SELLER/Default/2023/1/JG/OG/XZ/23618296/amoxycillin-250mg-cap.jpg' },
  { id: 3, name: 'Cetirizine 10mg', price: 15, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt44ubRv8yRQXxCctD6GhXCRaYhXDPGvXVDg&s' },
  { id: 4, name: 'Ibuprofen 400mg', price: 30, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ80Tpx4efewZk8jFPM7pc9CPOryygO9OCOA&s' },
  { id: 5, name: 'Azithromycin 500mg', price: 60, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoolgl8Isah44ndvVVKNR8_Ojm9miY5WfNpA&s' },
  { id: 6, name: 'Metformin 500mg', price: 35, image: 'https://5.imimg.com/data5/SELLER/Default/2024/10/457361991/BS/GE/MD/150989760/metformin-500-mg-tablet-1-500x500.png' },
  { id: 7, name: 'Aspirin 75mg', price: 20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuzHEMY-C8LKhd-Z9R14yTbnH4GYPBSVEEDw&s' },
  { id: 8, name: 'Pantoprazole 40mg', price: 28, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTztpw_x9KktyBhEVMjCa0Ce4yUXUPMoycqCQ&s' },
  { id: 9, name: 'Vitamin C 500mg', price: 18, image: 'https://m.media-amazon.com/images/I/61mtSUqOhdS._AC_UF1000,1000_QL80_.jpg' },
  { id: 10, name: 'Cough Syrup', price: 50, image: 'https://4.imimg.com/data4/TE/US/GLADMIN-3513191/qqq3-500x500.jpg' },
  
];

const ShopPage = () => {
  return (
    <div className="shop-container">
      <h1>🛒 Pharmacy Store</h1>
      <div className="product-grid">
        {medicines.map((medicine) => (
          <div className="product-card" key={medicine.id}>
            <img src={medicine.image} alt={medicine.name} />
            <h3>{medicine.name}</h3>
            <p>₹{medicine.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
