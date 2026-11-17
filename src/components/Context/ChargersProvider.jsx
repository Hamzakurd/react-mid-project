
import { useEffect, useState } from "react";
import { ChargersContext } from "./ChargersContext";
import { initialChargers } from "../Data/chargersData";

const STORAGE_KEY = "evWiseChargersV2";

export function ChargersProvider({ children }) {
  const [chargers, setChargers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }

      return initialChargers;
    } catch {
      return initialChargers;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(chargers)
      );
    } catch (error) {
      console.error("Failed to save chargers:", error);
    }
  }, [chargers]);

  const addCharger = (charger) => {
    const newCharger = {
      ...charger,
      id: crypto.randomUUID()
    };

    setChargers((prev) => [...prev, newCharger]);
  };

  const updateCharger = (id, updatedData) => {
    setChargers((prev) =>
      prev.map((charger) =>
        charger.id === id
          ? { ...charger, ...updatedData }
          : charger
      )
    );
  };

  const deleteCharger = (id) => {
    setChargers((prev) =>
      prev.filter((charger) => charger.id !== id)
    );
  };

  return (
    <ChargersContext.Provider
      value={{
        chargers,
        addCharger,
        updateCharger,
        deleteCharger
      }}
    >
      {children}
    </ChargersContext.Provider>
  );
}
