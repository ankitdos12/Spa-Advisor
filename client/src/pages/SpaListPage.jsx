import React, { useContext, useState, useEffect } from 'react';
import { LocationContext } from '../context/LocationContext';
import { FilterContext } from '../context/FilterContext';
import FilterPanel from '../components/filters/FilterPanel';
import SpaList from '../components/spa/SpaList.jsx';
import { TiArrowBackOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const SpaListPage = () => {
    const navigate = useNavigate();
    const { userLocation } = useContext(LocationContext);
    const { filters, filteredSpas: contextFilteredSpas, resetFilters } = useContext(FilterContext);
    const [displayedSpas, setDisplayedSpas] = useState([]);
    const [sortOption, setSortOption] = useState('distance');

    useEffect(() => {
        window.scrollTo(0, 0);
        let results = [...contextFilteredSpas];
        // Sort results
        if (sortOption === 'distance' && userLocation) {
            results = sortByDistance(results, userLocation);
        } else if (sortOption === 'rating') {
            results = results.sort((a, b) => b.rating - a.rating);
        }
        setDisplayedSpas(results);
    }, [contextFilteredSpas, userLocation, sortOption]);

    // Helper function to sort spas by distance from user
    const sortByDistance = (spas, userLocation) => {
        return [...spas].sort((a, b) => {
            const distA = calculateDistance(userLocation, a.coordinates);
            const distB = calculateDistance(userLocation, b.coordinates);
            return distA - distB;
        });
    };

    // Simple distance calculation (for sorting purposes)
    const calculateDistance = (loc1, loc2) => {
        const latDiff = loc1.lat - loc2.lat;
        const lngDiff = loc1.lng - loc2.lng;
        return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => navigate(-1)} className="mb-4 sm:mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <div className="p-3 rounded-md"><TiArrowBackOutline className="text-4xl" /></div>
            </button>
            <h1 className="text-3xl font-bold mb-8">Find Your Perfect Spa</h1>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Filter panel (sidebar) */}
                <div className="w-full md:w-1/4">
                    <FilterPanel />
                </div>

                {/* Main content */}
                <div className="w-full md:w-3/4">
                    {/* Sort options */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <span className="font-medium mr-2">Found:</span>
                            <span>{displayedSpas.length} spas</span>
                        </div>

                        <div className="flex items-center">
                            <span className="mr-2">Sort by:</span>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="border rounded px-3 py-1"
                            >
                                <option value="distance">Distance</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                    </div>

                    {/* Results list */}
                    {displayedSpas.length > 0 ? (
                        <SpaList spas={displayedSpas} />
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-600">No spas found matching your criteria.</p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={resetFilters}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpaListPage;