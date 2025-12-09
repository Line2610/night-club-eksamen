'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Hero2 from "../Components/Hero2";

export default function BookTable() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookedTables, setBookedTables] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tableNumber: '',
    guests: '',
    date: '',
    contact: '',
    comment: ''
  });

  // Hent reservationer når siden loader
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:4000/reservations");
      if (response.ok) {
        const data = await response.json();
        // Filtrér kun reservationer med data og hent bordnumre
        const tableNumbers = data
          .filter(res => res.table && res.name)
          .map(res => parseInt(res.table));
        setBookedTables(tableNumbers);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleTableClick = (tableNumber) => {
    // Tillad ikke at vælge bookede borde
    if (bookedTables.includes(tableNumber)) {
      alert(`Table ${tableNumber} is already booked. Please select another table.`);
      return;
    }
    setSelectedTable(tableNumber);
    setFormData({ ...formData, tableNumber: tableNumber.toString() });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      name: formData.name,
      email: formData.email,
      table: parseInt(formData.tableNumber),
      guests: parseInt(formData.guests),
      date: formData.date,
      phone: formData.contact,
      comment: formData.comment
    };

    try {
      const response = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Table ${formData.tableNumber} booked successfully! Reservation ID: ${result.id}`);
        setFormData({
          name: '',
          email: '',
          tableNumber: '',
          guests: '',
          date: '',
          contact: '',
          comment: ''
        });
        setSelectedTable(null);
        fetchReservations(); // Opdater bookede borde
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Something went wrong. Please try again."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting booking.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
       <Hero2 title="Book Table" />

      {/* Table Grid */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-5 gap-8 mb-16">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((tableNum) => {
            const isSelected = selectedTable === tableNum;
            const isBooked = bookedTables.includes(tableNum);
            
            let tableImage;
            if ([1, 2, 4, 9, 6, 7, 11, 12, 14].includes(tableNum)) {
              tableImage = 'table_1.png';
            } else if ([3, 8, 13].includes(tableNum)) {
              tableImage = 'table_2.png';
            } else {
              tableImage = 'table_3.png';
            }
            
            return (
              <div
                key={tableNum}
                className={`relative aspect-square transition-all ${
                  isBooked 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer hover:scale-110'
                }`}
                onClick={() => handleTableClick(tableNum)}
              >
                {isSelected && !isBooked && (
                  <div className="absolute inset-[-5px] border-2 border-[#FF2A70] rounded-lg z-10"></div>
                )}
                
                <div className="relative w-full h-full">
                  <Image 
                    src={`/assets/table/${tableImage}`}
                    alt={`Table ${tableNum}`}
                    fill
                    className={`object-contain ${isBooked ? 'grayscale' : ''}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                    {tableNum}
                  </div>
                  {isBooked && (
                    <div className="absolute inset-0 flex items-center justify-center">

                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-[3px] mb-10">BOOK A TABLE</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-transparent border border-white text-white px-5 py-4 outline-none  placeholder-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-transparent border border-white text-white px-5 py-4 outline-none  placeholder-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="tableNumber"
                placeholder="Table Number"
                value={formData.tableNumber}
                onChange={handleInputChange}
                required
                className="bg-transparent border border-white text-white px-5 py-4 outline-none  placeholder-white"
              />
              <input
                type="number"
                name="guests"
                placeholder="Number of Guests"
                value={formData.guests}
                onChange={handleInputChange}
                min="1"
                required
                className="bg-transparent border border-white text-white px-5 py-4 outline-none  placeholder-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="bg-transparent border border-white text-white px-5 py-4 outline-none"
              />
              <input
                type="tel"
                name="contact"
                placeholder="Your Contact Number"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className="bg-transparent border border-white text-white px-5 py-4 outline-none placeholder-white"
              />
            </div>

            <textarea
              name="comment"
              placeholder="Your Comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows="5"
              className="bg-transparent border border-white text-white px-5 py-4 outline-none  placeholder-white"
            />

            <button
              type="submit"
              className="border-b border-t border-white px-6 py-2 self-end transition-all"
            >
              RESERVE
            </button>
          </form>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}
