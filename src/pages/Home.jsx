import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Clock, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet';
const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Engagement date: August 17, 2025 at 12:20 PM
  const engagementDate = new Date('2025-08-17T12:20:00');
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = engagementDate.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
          minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
          seconds: Math.floor(distance % (1000 * 60) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="min-h-screen pt-16">
      <Helmet>
        <title>Home - Our Love Story</title>
        <meta name="description" content="Welcome to our engagement and wedding website. Count down with us to our special day on August 17th!" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <motion.h1 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="font-script text-6xl md:text-8xl text-pink-600 font-bold">
                We're Getting
              </motion.h1>
              <motion.h2 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} className="font-serif text-4xl md:text-6xl text-gray-800 font-bold">
                Engaged!
              </motion.h2>
            </div>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }} className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Join us as we celebrate our love story and count down to our special moment together.
            </motion.p>

            {/* Engagement Details */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.8
          }} className="glass-effect rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Calendar className="h-6 w-6 text-pink-500" />
                <span className="text-lg font-medium text-gray-700">August 17, 2025</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Clock className="h-6 w-6 text-pink-500" />
                <span className="text-lg font-medium text-gray-700">12:20 PM</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <MapPin className="h-6 w-6 text-pink-500" />
                <span className="text-lg font-medium text-gray-700">Av Info pride, Medipally, Hyderabad</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img alt="Beautiful couple engagement photo" className="w-full h-[600px] object-cover" src="https://horizons-cdn.hostinger.com/091764ce-381d-4e02-9a8c-8ace184e9aaa/c77017f029ce50b5d17551e85b387aa5.jpg" />
              
              {/* Floating hearts */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => <Heart key={i} className="absolute text-pink-400 opacity-60 heart-float" style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                fontSize: `${1 + Math.random() * 1.5}rem`,
                animationDelay: `${Math.random() * 3}s`
              }} />)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="font-serif text-4xl md:text-5xl text-gray-800 font-bold mb-12">
            Countdown to Our Engagement
          </motion.h2>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{
            label: 'Days',
            value: timeLeft.days
          }, {
            label: 'Hours',
            value: timeLeft.hours
          }, {
            label: 'Minutes',
            value: timeLeft.minutes
          }, {
            label: 'Seconds',
            value: timeLeft.seconds
          }].map((item, index) => <motion.div key={item.label} initial={{
            opacity: 0,
            scale: 0.8
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="glass-effect rounded-2xl p-8 countdown-glow">
                <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-600 font-medium uppercase tracking-wide">
                  {item.label}
                </div>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Love Story Preview */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="font-serif text-4xl md:text-5xl text-gray-800 font-bold mb-8">
            Our Love Story
          </motion.h2>

          <motion.p initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">The day I met Sonali, it didn’t feel like our first meeting — “Pehle bhi main tumse mila hoon” kept playing in my head. She felt like the perfect missing piece in the puzzle of my life.</motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="grid md:grid-cols-3 gap-8">
            {[{
            title: "First Meeting - 20th July",
            description: "The day our paths crossed and changed our lives forever.",
            icon: "💕"
          }, {
            title: "First Date - 8th August",
            description: "A magical evening that confirmed what our hearts already knew.",
            icon: "🌟"
          }, {
            title: "The Proposal - 17th August",
            description: "Coming soon... August 17th will be our special moment!",
            icon: "💍"
          }].map((milestone, index) => <motion.div key={milestone.title} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="glass-effect rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{milestone.icon}</div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-3">
                  {milestone.title}
                </h3>
                <p className="text-gray-600">
                  {milestone.description}
                </p>
              </motion.div>)}
          </motion.div>
        </div>
      </section>
    </div>;
};
export default Home;