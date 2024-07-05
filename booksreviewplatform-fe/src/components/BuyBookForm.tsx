import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BuyBookFormProps {
  bookId: number;
  bookName: string;
  price: number;
}

const BuyBookForm: React.FC<BuyBookFormProps> = ({ bookId, bookName, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch('http://localhost:8000/api/payments/create-checkout-session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book_id: bookId }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
      toast.error(result.error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        {/* <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        /> */}
        <button
          type="submit"
          disabled={!stripe}
          className="bg-gray-800 hover:bg-black text-white font-normal my-4 py-2 px-4 rounded"
        >
          Pay ${(price / 100).toFixed(2)} for {bookName}
        </button>

      </form>
    </>
  );
};

export default BuyBookForm;
