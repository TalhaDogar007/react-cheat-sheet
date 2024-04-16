import React, { useReducer, useState } from 'react';

// Define the item type
interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

// Define the state type
interface State {
    cart: Item[];
    total: number;
}

// Define the initial state
const initialState: State = {
    cart: [],
    total: 0,
};

// Define the action types
type ActionType =
    | { type: 'ADD_ITEM'; payload: Item }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } };

// Define the reducer function
const reducer = (state: State, action: ActionType): State => {
    switch (action.type) {
      case 'ADD_ITEM': {
        const updatedCart = [...state.cart, action.payload];
        const total = state.total + action.payload.price * action.payload.quantity;
        return { ...state, cart: updatedCart, total };
      }
      case 'REMOVE_ITEM': {
        const updatedCart = state.cart.filter((item) => item.id !== action.payload);
        const removedItem = state.cart.find((item) => item.id === action.payload);
        const total = state.total - (removedItem ? removedItem.price * removedItem.quantity : 0);
        return { ...state, cart: updatedCart, total };
      }
      case 'UPDATE_QUANTITY': {
        const updatedCart = state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        );
        const total = state.cart.reduce((acc, item) => {
          if (item.id === action.payload.id) {
            return acc + item.price * action.payload.quantity;
          }
          return acc + item.price * item.quantity;
        }, 0);
        return { ...state, cart: updatedCart, total };
      }
      default:
        throw new Error('Unsupported action type');
    }
  };
  

  const ShoppingCart: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [itemName, setItemName] = useState<string>('');
    const [itemPrice, setItemPrice] = useState<number>(0);
    const [itemQuantity, setItemQuantity] = useState<number>(1);

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: Item = {
            id: Date.now(), // Generate a unique ID for the item
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
        };
        dispatch({ type: 'ADD_ITEM', payload: newItem });
        // Reset form fields after adding the item
        setItemName('');
        setItemPrice(0);
        setItemQuantity(1);
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {state.cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} - Quantity: {item.quantity}
                        <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total: ${state.total}</p>
            <form onSubmit={handleAddItem}>
                <input type="text" placeholder="Item name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                <input type="number" placeholder="Item price" value={itemPrice} onChange={(e) => setItemPrice(parseFloat(e.target.value))} />
                <input type="number" placeholder="Quantity" value={itemQuantity} onChange={(e) => setItemQuantity(parseInt(e.target.value))} />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};



const UseReducer: React.FC = () => {
    return <ShoppingCart />;
};

export default UseReducer;
