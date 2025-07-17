import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function PayFee() {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
      toast.error("Please fill in all fields");
      return;
    }
    // Simulate payment processing
    try {
      setLoading(true);
      await axios
        .patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/pay`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Payment response:", res.data);
          toast.success("Payment successful!");
          navigate("/profile");
        })
        .catch((err) => {
          console.error("Payment error:", err);
          toast.error("Payment failed. Please try again.");
        });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred while processing the payment.");
    } finally {
      setLoading(false);
      setCardNumber("");
      setCardHolderName("");
      setExpiryDate("");
      setCvv("");
    }
  };
  return (
    <div className="w-screen min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white w-xs md:w-lg px-6 py-4 border border-gray-600 rounded-sm">
        <h1 className="text-lg font-semibold">Simulated Payment Gateway</h1>
        <div className="mt-4 flex flex-col gap-3">
          <p className="text-gray-600 mt-6">Enter your dummy card details</p>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card Number"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          <input
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            type="text"
            placeholder="Card Holder Name"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          <input
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            type="date"
            placeholder="Expiry Date (MM/YY)"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            maxLength={3}
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handlePayment}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Pay
        </button>
      </div>
    </div>
  );
}

export default PayFee;
