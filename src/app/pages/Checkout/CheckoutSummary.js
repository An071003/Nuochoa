import React from "react";

export default function CheckoutSummary({ cartItems, total }) {

  return (
    <div className="w-full lg:w-1/3 bg-gray-100 shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4">Sản phẩm trong giỏ hàng</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md mr-4"
              />
              <div>
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x {item.price.toLocaleString()}₫
                </p>
              </div>
            </div>
            <p className="text-sm font-bold">
              {(item.price * item.quantity).toLocaleString()}₫
            </p>
          </li>
        ))}
      </ul>

      <table className="w-full mt-6">
        <tbody>
          <tr>
            <td className=" text-lg font-bold">Tổng:</td>
            <td className="text-right text-lg font-bold">{total.toLocaleString()}₫</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
