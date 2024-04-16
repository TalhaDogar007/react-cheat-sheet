import React, { useState, useMemo } from 'react';

const ItemList: React.FC<{ items: number[] }> = ({ items }) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleItemClick = (item: number) => {
        setSelectedItem(item);
    };

    const sumOfItems = useMemo(() => {
        console.log('Calculating sum...');
        return items.reduce((acc, curr) => acc + curr, 0);
    }, [items]); // Re-run calculation only if 'items' array changes

    return (
        <div>
            <ul>
                {items.map((item) => (
                    <li
                        key={item}
                        onClick={() => handleItemClick(item)}
                        style={{ cursor: 'pointer' }}
                    >
                        {item} {selectedItem === item ? '(Selected)' : ''}
                    </li>
                ))}
            </ul>
            <p>Sum of Items: {sumOfItems}</p>
        </div>
    );
};

const UseMemo: React.FC = () => {
    const items = [1, 2, 3, 4, 5];

    return <ItemList items={items} />;
};

export default UseMemo;
