import React, { createContext, useState, useContext } from 'react';

// Create a Context for managing the table layout globally
const TableLayoutContext = createContext();

// Provider component to supply table layout data to its children
export const TableLayoutProvider = ({ children }) => {
    const [layout, setLayout] = useState([]); // State to hold current table layout (initially empty)

    return (
        <TableLayoutContext.Provider value={{ layout, setLayout }}>
            {children}
        </TableLayoutContext.Provider>
    );
};

// Custom hook to access the TableLayoutContext easily inside components
export const useTableLayout = () => {
    return useContext(TableLayoutContext);
};
