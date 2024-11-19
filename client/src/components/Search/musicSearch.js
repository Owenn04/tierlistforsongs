//SCRAPING THIS IDEA FOR A BIT NOW. THIS API SUCKS

const MusicSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return [];
    
    try {
        const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
            throw new Error('Search failed');
        }
        
        const results = await response.json();
        console.log(results)
        return results;
        
    } catch (error) {
        console.error('Error searching music:', error);
        return [];
    }
};

export default MusicSearch;