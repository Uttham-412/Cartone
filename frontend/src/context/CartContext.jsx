import {
    createContext,
    useEffect,
    useState,
} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
    const [cartCount, setCartCount] =
        useState(0);

    useEffect(() => {
        const storedCount =
            localStorage.getItem("cartCount");

        if (storedCount) {
            setCartCount(Number(storedCount));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "cartCount",
            cartCount
        );
    }, [cartCount]);

    return (
        <CartContext.Provider
            value={{
                cartCount,
                setCartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;