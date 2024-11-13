import React, { useState, useEffect } from "react";
import styles from './components.module.css'

interface SearchBarProps<T> {
    // List of items to search through (Generic)
    items: T[]; 
    // Callback to pass filtered results back
    onResults: (results: T[]) => void; 
    // key for objects; searching by this property
    searchKey: keyof T; 
    //optional: lets search bar reset 
    resetCondition?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar = <T,>({
    items,
    onResults,
    searchKey,
    resetCondition,
}: SearchBarProps<T>) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filter the items based on the search term
        const filteredResults = items.filter((item) => {
            return item[searchKey]?.toString().toLowerCase().includes(value.toLowerCase());
        });

        // Send filtered results back to the parent component
        onResults(filteredResults);
    };

    useEffect(() => {
        if (resetCondition) {
          setSearchTerm("");
        }
    }, [resetCondition]); 

    return (
        <div className ={styles.search}>
            <label> Search</label>
            <input
                className= {styles.searchBar}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
};
