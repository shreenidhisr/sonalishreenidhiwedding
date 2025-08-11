import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        <Helmet>
          <title>Our Love Story - Engagement & Wedding</title>
          <meta name="description" content="Join us as we celebrate our engagement and upcoming wedding. Share in our love story and precious moments." />
        </Helmet>
        
        {/* Floating petals background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-300 text-2xl petal-fall opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            >
              🌸
            </div>
          ))}
        </div>

        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;