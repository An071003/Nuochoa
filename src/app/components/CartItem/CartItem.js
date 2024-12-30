export default function CartItem({ product, onIncrease, onDecrease, onRemove }) {
    return (
        <tr className="border-b">
            <td className="p-3 flex items-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 mr-4"
                />
                {/* Đoạn này áp dụng hiệu ứng cắt chữ */}
                <span
                    className="block w-40 overflow-hidden whitespace-nowrap text-ellipsis"
                    title={product.name} // Hiển thị toàn bộ tên khi hover
                >
                    {product.name}
                </span>
            </td>
            <td className="p-3">{product.price.toLocaleString()}₫</td>
            <td className="p-3">
                <div className="flex items-center">
                    <button
                        className="px-2 py-1 border"
                        onClick={() => onDecrease(product.id)}
                    >
                        -
                    </button>
                    <span className="px-3">{product.quantity}</span>
                    <button
                        className="px-2 py-1 border"
                        onClick={() => onIncrease(product.id)}
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="p-3">{(product.price * product.quantity).toLocaleString()}₫</td>
            <td className="p-3">
                <button
                    className="text-red-500 hover:underline"
                    onClick={() => onRemove(product.id)}
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
}
