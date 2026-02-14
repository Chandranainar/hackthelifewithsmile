import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Fireworks = () => {
    // POWERFUL sparks: More particles, brighter colors, bigger explosion
    const particles = Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        angle: Math.random() * 360,
        distance: Math.random() * 250 + 50, // Wider explosion
        size: Math.random() * 8 + 3, // Bigger particles
        color: `hsl(${100 + Math.random() * 60}, 100%, 75%)`, // Very bright greens
        delay: Math.random() * 0.1
    }));

    return (
        <div className="fireworks-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 20 }}>
            {/* Flash Effect */}
            <motion.div
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: 0, scale: 4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(100,255,100,0) 70%)',
                    zIndex: 1
                }}
            />
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                        x: Math.cos(p.angle * Math.PI / 180) * p.distance,
                        y: Math.sin(p.angle * Math.PI / 180) * p.distance + 50, // Gravity
                        opacity: [1, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: p.angle
                    }}
                    transition={{
                        duration: 1.5 + Math.random(),
                        ease: "easeOut",
                        delay: p.delay
                    }}
                    style={{
                        position: 'absolute',
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: '50%',
                        boxShadow: `0 0 20px ${p.color}, 0 0 40px ${p.color}, 0 0 60px rgba(255, 255, 255, 0.8)` // Intense Glow
                    }}
                />
            ))}
        </div>
    );
};

const Home = () => {
    const [isCelebrated, setIsCelebrated] = useState(false);

    // Bubbles configuration
    const bubbles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 50 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5
    }));

    const handleHeartDoubleClick = () => {
        if (!isCelebrated) {
            setIsCelebrated(true);
            setTimeout(() => {
                setIsCelebrated(false);
            }, 6000); // Revert after 6 seconds
        }
    };

    return (
        <motion.div
            className="home-container"
            style={{ userSelect: 'none' }} // Prevent blue selection on double-tap
            animate={{
                background: isCelebrated
                    ? "radial-gradient(circle at center, #0a1f0a 0%, #000000 100%)" // Greenish dark
                    : "radial-gradient(circle at center, #2b1111 0%, #000000 100%)" // Reddish dark
            }}
            transition={{
                duration: 2.5,
                ease: "easeInOut",
                delay: isCelebrated ? 0.6 : 0 // Delay turning GREEN, but instant reverting to RED (or keep delay symmetrical? user said "first spark then screen change", so delay on entry is key)
            }}
        >
            {/* Floating Bubbles Background */}
            <div className="bubbles-container">
                {bubbles.map((bubble) => (
                    <motion.div
                        key={bubble.id}
                        className="bubble"
                        style={{
                            width: bubble.size,
                            height: bubble.size,
                            left: `${bubble.x}%`,
                            top: `${bubble.y}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0.3, 0.6, 0.3],
                            backgroundColor: isCelebrated ? "#6bff6b" : undefined, // Brighter green bubble
                            boxShadow: isCelebrated ? "0 0 20px #6bff6b" : undefined
                        }}
                        transition={{
                            duration: bubble.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: bubble.delay,
                            backgroundColor: { duration: 2, ease: "easeInOut", delay: isCelebrated ? 0.6 : 0 },
                            boxShadow: { duration: 2, ease: "easeInOut", delay: isCelebrated ? 0.6 : 0 }
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="content-wrapper">
                <div className="heart-wrapper" style={{ position: 'relative', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
                    <AnimatePresence mode="wait">
                        {!isCelebrated ? (
                            <motion.div
                                key="heart"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }} // Smoother exit
                                transition={{ duration: 0.5 }}
                                className="heart-container"
                                style={{ margin: 0 }}
                                onDoubleClick={handleHeartDoubleClick}
                            >
                                <motion.div
                                    className="heart"
                                    animate={{ scale: [1, 1.15, 1] }} // Slightly more distinct heartbeat
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    ❤️
                                </motion.div>
                            </motion.div>
                        ) : (
                            <Fireworks key="fireworks" />
                        )}
                    </AnimatePresence>
                </div>


                <motion.h1
                    className="title"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        backgroundImage: isCelebrated
                            ? "linear-gradient(45deg, #4dff4d, #43ff9f, #6bff6b)" // Green gradient
                            : "linear-gradient(45deg, #ff4d4d, #ff9f43, #ff6b6b)" // Red gradient
                    }}
                    transition={{ duration: 2, delay: isCelebrated ? 0.6 : 0 }} // Slow transition for text too
                >
                    {isCelebrated ? "Welcome Chandru" : "hackthelifewithsmile"}
                </motion.h1>

                <motion.p
                    className="subtitle"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {isCelebrated ? "let's create something magic" : "welcome back"}
                </motion.p>
            </div>
        </motion.div>
    );
};

export default Home;
