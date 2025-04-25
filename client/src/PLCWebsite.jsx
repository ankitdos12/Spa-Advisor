import React, { useState } from 'react';
import plcData from './data/plcData.json';

const PLCWebsite = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className='h-11 mt-12'></h1>
            {/* Hero Section */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        {plcData.hero.title}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        {plcData.hero.description}
                    </p>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
                        {plcData.hero.buttonText}
                    </button>
                </div>
                <div>
                    <img
                        src={plcData.hero.image}
                        alt="PLC Control Panel"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>

            {/* Key Offerings */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">{plcData.keyOfferings.title}</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    {plcData.keyOfferings.items.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <div className={`bg-${item.icon === 'compliance' || item.icon === 'precision' ? 'green' : 'blue'}-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 text-${item.icon === 'compliance' || item.icon === 'precision' ? 'green' : 'blue'}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us & Appointment Form */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Why Choose Us */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">{plcData.whyChooseUs.title}</h2>
                    <div className="space-y-4">
                        {plcData.whyChooseUs.points.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-gray-600 italic text-center">
                        "{plcData.whyChooseUs.testimonial}"
                    </p>
                </div>

                {/* Appointment Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Make an Appointment</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                        >
                            Submit Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PLCWebsite;