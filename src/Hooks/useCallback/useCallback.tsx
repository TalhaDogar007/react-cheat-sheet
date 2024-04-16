import React, { useState, useCallback } from 'react';

// ChildComponent receives a function as a prop
interface ChildProps {
  handleClick: () => void;
}

const ChildComponent: React.FC<ChildProps> = ({ handleClick }) => {
  return <button onClick={handleClick}>Click me</button>;
};

const UseCallback: React.FC = () => {
  const [count, setCount] = useState(0);

  // Define the handleClick function
  const handleClick = useCallback(() => {
    // Perform some action
    console.log('Button clicked!');
  }, []); // Empty dependency array means the function is memoized once and won't change

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <ChildComponent handleClick={handleClick} />
    </div>
  );
};

export default UseCallback;
