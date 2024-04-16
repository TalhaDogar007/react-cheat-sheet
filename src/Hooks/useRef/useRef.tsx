import React, { useRef, useEffect } from 'react';

const MyComponent: React.FC = () => {
  // Create a ref for the input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Set a value that persists across renders
  const persistedValue = useRef<string>('initialValue');

  return (
    <div>
      {/* Input field */}
      <input ref={inputRef} type="text" />

      {/* Display the persisted value */}
      <p>Persisted Value: {persistedValue.current}</p>
    </div>
  );
};

const UseRef: React.FC = () => {
    return <MyComponent />;
};

export default UseRef;
