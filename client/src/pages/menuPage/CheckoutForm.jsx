import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FaPaypal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [address, setAddress] = useState({
        houseNumber: '',
        locality: '',
        pincode: '',
        city: '',
        state: '',
        phoneNumber: ''
    });

    const handleAddressChange = (event) => {
        setAddress({ ...address, [event.target.name]: event.target.value });
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Handle COD option
        if (paymentMethod === 'cod') {
            // Handle Cash on Delivery logic
            console.log('Processing Cash on Delivery');
            setLoading(false);
            return;
        }

        // Handle online payment method
        if (!stripe || !elements) {
            console.error('Stripe.js has not loaded yet.');
            setLoading(false);
            return;
        }

        // Process Stripe payment
        // ...
    };

    return (
        <div className="h-screen menu-background p-5">
            <div className="flex justify-center items-center mb-10">
                <h2 className="text-3xl text-slate-700 font-semibold">Checkout</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-start items-start gap-8">
                <div className="md:w-1/2 space-y-6">
                    {/* Order Summary */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h4 className="text-xl text-gray-800 font-semibold">Order Summary</h4>
                        <p className="mt-4 text-gray-600">Total Price: <span className="font-semibold">₹{price}</span></p>
                        <p className="text-gray-600">Items: <span className="font-semibold">{Array.isArray(cart) ? cart.length : 0}</span></p>
                    </div>
                </div>
                <div className="md:w-1/2 w-full bg-white shadow-2xl rounded-lg px-6 py-10">
                    <h4 className="text-xl text-slate-600 font-semibold mb-4">Process Your Payment!</h4>
                    <h5 className="font-medium text-gray-700">Payment Method</h5>
                    <div className="flex items-center mt-4 mb-2">
                        <input type="radio" id="card" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={handlePaymentMethodChange} />
                        <label htmlFor="card" className="ml-2">Credit / Debit Card</label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input type="radio" id="cod" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={handlePaymentMethodChange} />
                        <label htmlFor="cod" className="ml-2">Cash on Delivery</label>
                    </div>
                    {paymentMethod === 'card' && (
                        <form onSubmit={handleSubmit} className="mt-4">
                            <input
                                type="text"
                                name="houseNumber"
                                value={address.houseNumber}
                                onChange={handleAddressChange}
                                placeholder="House Number"
                                className="mb-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                            />
                            {/* Add more address fields here */}
                            <CardElement options={{
                                style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } },
                            }} />
                            {cardError && <p className="text-red-600 mt-2">{cardError}</p>}
                            <button type="submit" disabled={!stripe || loading} className="mt-6 w-full bg-yellow-300 hover:bg-yellow-400 text-slate-700 font-medium py-2 rounded shadow">
                                {loading ? 'Processing...' : 'Pay'}
                            </button>
                        </form>
                    )}
                    {paymentMethod === 'cod' && (
                        <button onClick={handleSubmit} disabled={loading} className="mt-6 w-full bg-yellow-300 hover:bg-yellow-400 text-slate-700 font-medium py-2 rounded shadow">
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
