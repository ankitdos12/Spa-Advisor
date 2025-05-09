import React, { useState, useEffect } from 'react';
import { SERVICE_CATEGORIES } from '../types/service';
import { addService } from '../api/serviceApi';
import { validateService } from '../utils/validation';
import FormInput from '../components/form/FormInput';

const AddServicePage = () => {
    const [spaId, setSpaId] = useState('');
    const [isIdSubmitted, setIsIdSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [services, setServices] = useState([{
        title: '',
        description: '',
        duration: [''],
        price: '',
        image: '',
        details: [''],
        category: SERVICE_CATEGORIES[0]
    }]);

    const handleServiceChange = (index, field, value) => {
        const newServices = [...services];
        if (field === 'image' && value instanceof FileList) {
            const file = value[0];
            if (file && file.type.startsWith('image/')) {
                newServices[index][field] = file;
                newServices[index].imagePreview = URL.createObjectURL(file);
            }
        } else {
            newServices[index][field] = value;
        }
        setServices(newServices);
    };

    const handleArrayChange = (index, field, arrIndex, value) => {
        const newServices = [...services];
        newServices[index][field][arrIndex] = value;
        setServices(newServices);
    };

    const handleAddArrayItem = (index, field) => {
        const newServices = [...services];
        newServices[index][field] = [...newServices[index][field], ''];
        setServices(newServices);
    };

    const handleRemoveArrayItem = (index, field, arrIndex) => {
        const newServices = [...services];
        newServices[index][field] = newServices[index][field].filter((_, i) => i !== arrIndex);
        setServices(newServices);
    };

    const handleAddService = () => {
        setServices([...services, {
            title: '',
            description: '',
            duration: [''],
            price: '',
            image: '',
            details: [''],
            category: SERVICE_CATEGORIES[0]
        }]);
    };

    const handleRemoveService = (index) => {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
    };

    const handleSubmitId = (e) => {
        e.preventDefault();
        if (spaId.trim()) {
            setIsIdSubmitted(true);
        }
    };

    const handleSubmitServices = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            // Validate all services
            services.forEach((service, index) => validateService(service, index));

            // Submit services sequentially
            await Promise.all(services.map(service => addService(spaId, service)));
            
            alert('Services added successfully!');
            setServices([{
                title: '',
                description: '',
                duration: [''],
                price: '',
                image: '',
                details: [''],
                category: SERVICE_CATEGORIES[0]
            }]);
            setIsIdSubmitted(false);

        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup preview URLs when component unmounts
            services.forEach(service => {
                if (service.imagePreview) {
                    URL.revokeObjectURL(service.imagePreview);
                }
            });
        };
    }, [services]);

    if (error) {
        return (
            <div className="max-w-[70rem] mx-auto p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                    <button 
                        onClick={() => setError('')}
                        className="underline"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[70rem] mx-auto p-6">
            {!isIdSubmitted ? (
                <form onSubmit={handleSubmitId} className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Enter Spa ID</h2>
                    <FormInput
                        label="Spa ID"
                        value={spaId}
                        onChange={(e) => setSpaId(e.target.value)}
                        required
                        placeholder="Enter the Spa ID"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Continue
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSubmitServices} className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Add Services for Spa ID: {spaId}</h2>
                    {services.map((service, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Service {index + 1}</h3>
                                {services.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveService(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <FormInput
                                label="Title"
                                value={service.title}
                                onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                                required
                                placeholder={"e.g. Swedish Massage"}
                            />
                            <FormInput
                                label="Description"
                                value={service.description}
                                onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                                required
                                placeholder={"e.g. A relaxing full-body massage"}
                            />
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Duration Options</label>
                                {service.duration.map((dur, durIndex) => (
                                    <div key={durIndex} className="flex gap-2">
                                        <FormInput
                                            value={dur}
                                            onChange={(e) => handleArrayChange(index, 'duration', durIndex, e.target.value)}
                                            placeholder="e.g. 60 mins"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveArrayItem(index, 'duration', durIndex)}
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddArrayItem(index, 'duration')}
                                    className="text-blue-500"
                                >
                                    Add Duration Option
                                </button>
                            </div>
                            <FormInput
                                label="Price"
                                type="number"
                                value={service.price}
                                onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                                required
                                placeholder={"e.g. 1000"}
                            />
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Service Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleServiceChange(index, 'image', e.target.files)}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {service.imagePreview && (
                                    <img 
                                        src={service.imagePreview} 
                                        alt="Preview" 
                                        className="mt-2 max-w-[200px] rounded-md"
                                    />
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Details</label>
                                {service.details.map((detail, detailIndex) => (
                                    <div key={detailIndex} className="flex gap-2">
                                        <FormInput
                                            value={detail}
                                            onChange={(e) => handleArrayChange(index, 'details', detailIndex, e.target.value)}
                                            placeholder="Add service detail"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveArrayItem(index, 'details', detailIndex)}
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddArrayItem(index, 'details')}
                                    className="text-blue-500"
                                >
                                    Add Detail
                                </button>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Category</label>
                                <select
                                    value={service.category}
                                    onChange={(e) => handleServiceChange(index, 'category', e.target.value)}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {SERVICE_CATEGORIES.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleAddService}
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        >
                            Add Another Service
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Submit All Services
                        </button>
                    </div>
                </form>
            )}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded">
                        Processing...
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddServicePage;
