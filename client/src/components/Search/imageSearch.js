import React, { useEffect, useState } from 'react';
import "./imageSearch.css"
import { useDrag } from 'react-dnd';

const ImageSearch = ({ query, numResults  }) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (query) {
        const fetchResults = async () => {
            try {
            const response = await fetch(`http://localhost:5000/api/image-search?query=${encodeURIComponent(query)}&num_results=${numResults}`);
            const results = await response.json(); // Assuming the API response is JSON
            console.log("image log",results)
            setSearchResults(results);
            } catch (error) {
            console.error('Search failed:', error);
            }
        };

        fetchResults();
        } else {
        setSearchResults([]);
        }
    }, [query, numResults]);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'image',  
        item: (monitor) => ({ url: monitor.url, description: monitor.description }), 
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    }));



    return (
        <div className="image-search-container">
        {searchResults.map((result, index) => (
            <div
                key={index}
                className="result-item"
                style={{
                    backgroundImage: `url(${result.url})`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    opacity: isDragging ? 0.5 : 1
                }}
                ref={drag}
            >
            <p>{result.description}</p>
            </div>
        ))}
        </div>
    );
};

export default ImageSearch;
