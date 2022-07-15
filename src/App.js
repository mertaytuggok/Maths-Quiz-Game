import React, { useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Game from './pages/Game.js';
import Home from './pages/Home.js';
import Result from './pages/Final.js';
import { Context } from './hooks/provider.js';

const App = () => {
    const { setTotalResultToStorage, setTour } = useContext(Context);

    // Çalışacak Metodlar
    useEffect(() => {
        const resultData = JSON.parse(localStorage.getItem('totalResult'));
        const tourData = JSON.parse(localStorage.getItem('tour'));
        if (resultData) {
            setTotalResultToStorage(resultData);
        } else {
            setTotalResultToStorage();
        }

        if (tourData) {
            setTour(tourData);
        }
    }, []);

    // React--Router 
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/Final" element={<Result />} />
        </Routes>
    );
};

export default App;