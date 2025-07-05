import React, { useState, ChangeEvent, FormEvent } from 'react';

const Form = () => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here, like sending data to backend
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('message', message);
        if (image) {
            formData.append('image', image);
        }

        // Example: send formData to backend or perform any other action
        console.log('Form data:', formData);

        // Reset form fields
        setFullName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setMessage('');
        setImage(null);
    };

    return (
        <div className="p-2 overflow-hidden h-full relative flex items-center justify-center">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg">
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Enquiry Form</h2> {/* Heading for the form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Full Name:
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone:
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address:
                            </label>
                            <textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                rows={3}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message:
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={3}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Upload Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
