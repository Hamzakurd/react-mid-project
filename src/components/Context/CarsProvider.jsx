
import { useEffect, useState } from "react";
import { CarsContext } from "./CarsContext";
import { initialCars } from "../Data/carsData";

const STORAGE_KEY = "evWiseCars";

export function CarsProvider({ children }) {
  const [cars, setCars] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }

      return initialCars;
    } catch (error) {
      console.error("Failed to load cars:", error);
      return initialCars;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cars)
      );
    } catch (error) {
      console.error("Failed to save cars:", error);
    }
  }, [cars]);

  const addCar = (car) => {
    const newCar = {
      ...car,
      id: crypto.randomUUID()
    };

    setCars((prev) => [...prev, newCar]);
  };

  const updateCar = (id, updatedData) => {
    setCars((prev) =>
      prev.map((car) =>
        car.id === id
          ? { ...car, ...updatedData }
          : car
      )
    );
  };

  const deleteCar = (id) => {
    setCars((prev) =>
      prev.filter((car) => car.id !== id)
    );
  };

  return (
    <CarsContext.Provider
      value={{
        cars,
        addCar,
        updateCar,
        deleteCar
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}
