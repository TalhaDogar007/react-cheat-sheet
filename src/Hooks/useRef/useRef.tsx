import { useRef } from 'react';

const Counter: React.FC = () => {
    const ref = useRef(0);
    console.log('ref: ', ref);

    function handleClick() {
        ref.current = ref.current + 1;
        alert('You clicked ' + ref.current + ' times!');
    }

    return (
        <button onClick={handleClick}>
            Click me!
        </button>
    );
}

const UseRef: React.FC = () => {
    return <Counter />;
};

export default UseRef;
