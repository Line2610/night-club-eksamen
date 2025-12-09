'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Hero2 from "../Components/Hero2";

export default function BookTable() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tableNumber: '',
    guests: '',
    date: '',
    contact: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Hent reservationer når siden loader
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:4000/reservations");
      if (response.ok) {
        const data = await response.json();
        // Gem alle reservationer med dato og bordnummer
        setReservations(data.filter(res => res.table && res.date));
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // Tjek om et specifikt bord er booket på en specifik dato
  const isTableBookedOnDate = (tableNumber, date) => {
    if (!date) return false;
    return reservations.some(
      res => parseInt(res.table) === tableNumber && res.date === date
    );
  };

  const handleTableClick = (tableNumber) => {
    // Hvis der er valgt en dato, tjek om bordet er ledigt den dato
    if (formData.date && isTableBookedOnDate(tableNumber, formData.date)) {
      setErrorMessage(`Table ${tableNumber} is already booked on ${formData.date}. Please select another table or date.`);
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }
    setSelectedTable(tableNumber);
    setFormData({ ...formData, tableNumber: tableNumber.toString() });
    setErrors({ ...errors, tableNumber: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Ryd fejl for det pågældende felt
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    // Hvis dato ændres og der er valgt et bord, tjek tilgængelighed
    if (name === 'date' && selectedTable) {
      if (isTableBookedOnDate(selectedTable, value)) {
        setErrorMessage(`Table ${selectedTable} is already booked on ${value}. Please select another table or date.`);
        setTimeout(() => setErrorMessage(''), 4000);
        setSelectedTable(null);
        setFormData({ ...formData, date: value, tableNumber: '' });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Navn validering
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validering
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Bordnummer validering
    if (!formData.tableNumber) {
      newErrors.tableNumber = 'Please select a table';
    }
    
    // Antal gæster validering
    const guests = parseInt(formData.guests);
    if (!formData.guests) {
      newErrors.guests = 'Number of guests is required';
    } else if (guests < 1 || guests > 20) {
      newErrors.guests = 'Number of guests must be between 1 and 20';
    }
    
    // Dato validering
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Cannot book a table in the past';
      }
      
      // Tjek om bordet er booket på valgt dato
      if (formData.tableNumber && isTableBookedOnDate(parseInt(formData.tableNumber), formData.date)) {
        newErrors.tableNumber = `Table ${formData.tableNumber} is already booked on this date`;
      }
    }
    
    // Telefon validering
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contact.replace(/\s/g, ''))) {
      newErrors.contact = 'Please enter a valid phone number';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    // Validér formularen
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage('Please correct the errors in the form');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }
    
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
        setSuccessMessage(`Table ${formData.tableNumber} booked successfully for ${formData.date}!`);
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
        setErrors({});
        fetchReservations();
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Table is already booked for this date. Please select another table or date.");
        setTimeout(() => setErrorMessage(''), 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error submitting booking. Please try again.");
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
       <Hero2 title="Book Table" />

      {/* Feedback Messages */}
      {successMessage && (
        <div className="max-w-6xl mx-auto px-5 mt-8">
          <div className="bg-green-600 border border-green-500 text-white px-6 py-4 rounded">
            ✓ {successMessage}
          </div>
        </div>
      )}
      
      {errorMessage && (
        <div className="max-w-6xl mx-auto px-5 mt-8">
          <div className="bg-red-600 border border-red-500 text-white px-6 py-4 rounded">
            ✗ {errorMessage}
          </div>
        </div>
      )}

      {/* Table Grid */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-5 gap-8 mb-16">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((tableNum) => {
            const isSelected = selectedTable === tableNum;
            const isBooked = formData.date ? isTableBookedOnDate(tableNum, formData.date) : false;
            
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
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`bg-transparent border ${errors.name ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`bg-transparent border ${errors.email ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input
                  type="text"
                  name="tableNumber"
                  placeholder="Table Number"
                  value={formData.tableNumber}
                  onChange={handleInputChange}
                  required
                  readOnly
                  className={`bg-transparent border ${errors.tableNumber ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full cursor-not-allowed`}
                />
                {errors.tableNumber && <p className="text-red-500 text-sm mt-1">{errors.tableNumber}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="guests"
                  placeholder="Number of Guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  required
                  className={`bg-transparent border ${errors.guests ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full`}
                />
                {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className={`bg-transparent border ${errors.date ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none w-full`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="contact"
                  placeholder="Your Contact Number"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className={`bg-transparent border ${errors.contact ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full`}
                />
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
              </div>
            </div>

            <textarea
              name="comment"
              placeholder="Your Comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows="5"
              className="bg-transparent border border-white text-white px-5 py-4 outline-none placeholder-white"
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
