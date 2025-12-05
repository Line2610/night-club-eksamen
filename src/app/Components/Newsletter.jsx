"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/newsletters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setMessage("Thank you for subscribing!");
      setEmail("");
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-black text-white py-12 px-4">
      <div className="newsletter-container">
        <h2 className="text-center mb-4">WANT THE LATEST NIGHT CLUB NEWS</h2>
        <p className="text-center mb-15">
          Subscribe to our newsletter and never miss an <span className="text-[#FF2A70]">Event</span>
        </p>

        <form onSubmit={handleSubmit} className="text-center mb-4">
          <input type="email" placeholder="Enter Your Email" className="border-b border-white w-100 bg-transparent text-white px-2 py-2 mr-4" />
          <button type="submit" className="border-t border-b border-white cursor-pointer px-6 py-2 font-semibold">
            SUBSCRIBE
          </button>
        </form>

        {message && <p className="text-center">{message}</p>}
      </div>
    </section>
  );
}
