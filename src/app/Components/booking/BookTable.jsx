'use client';

import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Hero2 from '../Hero2';
import TableGrid from './TableGrid';
import BookingForm from './BookingForm';


export default function BookTable({ reservations }) {
  const [selectedTable, setSelectedTable] = useState(null);
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

  // Reservationer kommer nu fra props

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
    
    // Email validering (skal indeholde @ og slutte på .dk eller .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.(dk|com)$/i;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email must contain @ and end with .dk or .com';
    }
    
    // Bordnummer 
    if (!formData.tableNumber) {
      newErrors.tableNumber = 'Please select a table';
    }
    
    // Antal gæster 
    const guests = parseInt(formData.guests);
    if (!formData.guests) {
      newErrors.guests = 'Number of guests is required';
    } else if (guests < 1 || guests > 8) {
      newErrors.guests = 'Number of guests must be between 1 and 8';
    }
    
    // Dato
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
    
    // Telefon (kun tal tilladt)
    const phoneRegex = /^\d+$/;
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contact.replace(/\s/g, ''))) {
      newErrors.contact = 'Only numbers are allowed in phone number';
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
        // fetchReservations fjernet, da data nu kommer fra server props
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

        <div className="max-w-6xl mx-auto px-5 py-16">
          <TableGrid 
            selectedTable={selectedTable}
            handleTableClick={handleTableClick}
            isTableBookedOnDate={isTableBookedOnDate}
            formData={formData}
          />

        {/* Feedback besked */}
        {successMessage && (
          <div className="max-w-6xl mx-auto px-5 mt-8 mb-8">
            <div className="bg-[#FF2A70] border border-[#FF2A70] text-white px-6 py-4">
              ✓ {successMessage}
            </div>
          </div>
        )}
        
        {errorMessage && (
          <div className="max-w-6xl mx-auto px-5 mt-8 mb-8">
            <div className="bg-gray-700 border border-gray-700 text-white px-6 py-4">
              ✗ {errorMessage}
            </div>
          </div>
        )}

          <BookingForm 
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}


