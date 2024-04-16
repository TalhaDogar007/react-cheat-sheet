import React, { useRef, useEffect } from 'react';

const MyComponent: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h1>My Component</h1>
      <input ref={inputRef} type="text" />
    </div>
  );
};

const UseRef: React.FC = () => {
    return <MyComponent />;
};

export default UseRef;
