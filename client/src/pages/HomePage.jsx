import { dummySpaData, getSpasWithinRadius, getPopularSpas, getRecentSpas } from '../data/dummyData';
import LocationDetector from '../components/location/LocationDetector';
import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../context/LocationContext';
import HeroSection from '../components/HeroSection.jsx';
import SpaList from '../components/spa/SpaList.jsx';
import { Link } from 'react-router-dom';
import { getSpas } from '../api/api.js';

const HomePage = () => {
    const { userLocation } = useContext(LocationContext);
    const [nearbySpas, setNearbySpas] = useState([]);
    const [popularSpas, setPopularSpas] = useState([]);
    const [recentSpas, setRecentSpas] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchSpas = async () => {
            try {

                const response = await getSpas();
                console.log("response: ", response);
                if (userLocation) {
                    // Get spas within 10km radius
                    const nearby = getSpasWithinRadius(response, userLocation, 10);
                    setNearbySpas(nearby);
                }

                // Get popular spas (top 3 by rating)
                const popular = getPopularSpas(response, 'rating').slice(0, 3);
                setPopularSpas(popular);

                // Get recent spas (top 3 by date)
                const recent = getRecentSpas(response).slice(0, 3);
                setRecentSpas(recent);
            } catch (error) {
                console.error("Error fetching spas: ", error);
            }
        }

        fetchSpas();
    }, [userLocation]);

    console.log("popularSpas: ", popularSpas);

    return (
        <div>
            <HeroSection />
            <div className="container mx-auto px-4 py-8 zoom-in-up ">

                {/* Location Detector */}
                <div className="mb-10">
                    <LocationDetector />
                </div>
                {/* Nearby Spas */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold">Spas Near You</h2>
                        </div>
                        <Link to="/spas" className="text-blue-600 hover:text-blue-800">View all</Link>
                    </div>

                    {userLocation ? (
                        nearbySpas.length > 0 ? (
                            <SpaList spas={nearbySpas} />
                        ) : (
                            <p className="text-gray-600 text-center py-10">No spas found near your current location.</p>
                        )
                    ) : (
                        <p className="text-gray-600 text-center py-10">Enable location to see spas near you.</p>
                    )}
                </div>

                {/* Popular Spas */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Popular Spas</h2>
                        <Link to="/spas" className="text-blue-600 hover:text-blue-800">View all</Link>
                    </div>
                    <SpaList spas={popularSpas} />
                </div>

                {/* Recent Spas */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Recently Added</h2>
                        <Link to="/spas" className="text-blue-600 hover:text-blue-800">View all</Link>
                    </div>
                    <SpaList spas={recentSpas} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;