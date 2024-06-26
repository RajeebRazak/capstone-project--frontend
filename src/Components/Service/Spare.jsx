import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Productlist } from "../Price/Productlist";

function Spare({ addToCart, cartItems }) {
  return (
    <>
      <div>
        <section className="py-1 bg-light">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
              Spare's
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Productlist.map((product) => (
                <div key={product.id} className="flex flex-col mb-5">
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img
                      className="w-full h-64 object-cover ml-0"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="p-4">
                      <h5 className="font-bold text-lg mb-2">{product.name}</h5>
                      <p className="text-lg">${product.price}</p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button
                      className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-b-lg focus:outline-none"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Spare;
