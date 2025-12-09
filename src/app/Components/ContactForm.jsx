'use client';
import { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle form submission
        console.log('Form submitted:', formData);
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            comment: ''
        });
        setErrors({});
        
        alert('Thank you for your message!');
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl mx-auto">
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
                <textarea
                    name="comment"
                    placeholder="Your Comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows="5"
                    className="bg-transparent border border-white text-white px-5 py-4 outline-none placeholder-white w-full"
                />
                <button
              type="submit"
              className="border-b border-t cursor-pointer border-white text-white px-6 py-2 self-end transition-colors"
            >
              SEND
            </button>
            </form>
        </div>
    );
};

export default ContactForm;
