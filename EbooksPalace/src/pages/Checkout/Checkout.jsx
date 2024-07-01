import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import "./Checkout.css";

const ProductDisplay = ({ items, handleCheckout }) => (
    <section>
        {items.map(item => (
            <div className="product" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="description">
                    <h3>{item.name}</h3>
                    <h5>${item.price}</h5>
                </div>
            </div>
        ))}
        <button onClick={handleCheckout}>
            Checkout
        </button>
    </section>
);

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function Checkout() {
    const items = useSelector(state => state.cart.cart);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    const handleCheckout = async () => {
        try {
            const response = await fetch("https://ebookspalace.onrender.com/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(items)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url;  // redirige a Stripe
                } else {
                    console.error("Error: URL de redirección no encontrada.");
                }
            } else {
                console.error("Error en la respuesta del servidor:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay items={items} handleCheckout={handleCheckout} />
    );
}

