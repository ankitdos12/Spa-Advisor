import React, { useContext } from 'react';
import { LocationContext } from '../../context/LocationContext';
import LocationDisplay from './LocationDisplay';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

const LocationDetector = () => {
    const { userLocation, locationError, isLoading, detectLocation } = useContext(LocationContext);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className='flex justify-between items-center'>
                <h2 className="text-xl font-semibold mb-4">Find Spas Near You</h2>
                <div>
                    <button className="flex justify-between items-center mb-6 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-600 transition-colors">
                        <Link to="/spas" className="text-white pr-2">Search Spa Near You </Link>
                        <IoSearch />
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Detecting your location...</span>
                </div>
            ) : (
                <>
                    {locationError ? (
                        <div className="mb-4">
                            <div className="bg-red-100 text-red-700 p-3 rounded mb-3">
                                {locationError}
                            </div>
                            <button
                                onClick={detectLocation}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : userLocation ? (
                        <LocationDisplay location={userLocation} />
                    ) : (
                        <div className="text-center">
                            <p className="mb-4 text-gray-600">
                                Allow location access to find spas near you.
                            </p>
                            <button
                                onClick={detectLocation}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                Enable Location
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LocationDetector;