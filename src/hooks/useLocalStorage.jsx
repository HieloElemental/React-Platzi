import { useState, useEffect } from "react"

const useLocalStorage = ({ itemName, initialValue }) => {
  const [item, setItem] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    try {
      let initialItem = localStorage.getItem(itemName);
  
      if (!initialItem) {
        initialItem = initialValue;
        localStorage.setItem(itemName, JSON.stringify(initialValue));
      } else {
        initialItem = JSON.parse(initialItem);
        setItem(initialItem)
      }
    } catch (error) {
      setError(error)
    }

    setIsLoading(false);
  }, [initialValue, itemName]);


  const onItemChange = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
    return newItem;
  }

  return {
    item,
    onItemChange,
    isLoading,
    error,
  };
}

export { useLocalStorage }