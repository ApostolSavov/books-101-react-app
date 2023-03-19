import { useEffect, useState } from "react";

const useLocalStorage = () => {
    const [storedValue, setStoredValue] = useState({});

    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log('change');
            setStoredValue({ ...window.localStorage });
        });

    }, []);

    return storedValue;
};

export default useLocalStorage;