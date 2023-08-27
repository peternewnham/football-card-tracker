import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCollection = (id: string) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    (async () => {
      const jsonValue = (await AsyncStorage.getItem(id)) ?? '0';
      setValue(parseInt(jsonValue, 10));
    })();
  }, [id]);

  const updateValue = async (newValue: number) => {
    const jsonValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(id, jsonValue);
    setValue(newValue);
  };

  const incrementValue = async () => {
    await updateValue(value + 1);
  };

  const decrementValue = async () => {
    await updateValue(Math.max(value - 1, 0));
  };

  return {
    collected: value,
    increment: incrementValue,
    decrement: decrementValue,
  };
};
