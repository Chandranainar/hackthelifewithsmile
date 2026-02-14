import React, { useState, useEffect, useRef } from 'react';
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

const HeroSection = () => {
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
            style={{
                userSelect: 'none',
                height: '100vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}
            animate={{
                background: isCelebrated
                    ? "radial-gradient(circle at center, #0a1f0a 0%, #000000 100%)"
                    : "radial-gradient(circle at center, #2b1111 0%, #000000 100%)"
            }}
            transition={{
                duration: 2.5,
                ease: "easeInOut",
                delay: isCelebrated ? 0.6 : 0
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
                            backgroundColor: isCelebrated ? "#6bff6b" : undefined,
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
                                exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
                                transition={{ duration: 0.5 }}
                                className="heart-container"
                                style={{ margin: 0 }}
                                onDoubleClick={handleHeartDoubleClick}
                            >
                                <motion.div
                                    className="heart"
                                    animate={{ scale: [1, 1.15, 1] }}
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
                            ? "linear-gradient(45deg, #4dff4d, #43ff9f, #6bff6b)"
                            : "linear-gradient(45deg, #ff4d4d, #ff9f43, #ff6b6b)"
                    }}
                    transition={{ duration: 2, delay: isCelebrated ? 0.6 : 0 }}
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

            {/* Scroll Indicator */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '50%',
                    translateX: '-50%',
                    opacity: 0.5,
                    color: 'white'
                }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                ↓
            </motion.div>
        </motion.div>
    );
};

const Firefly = ({ id }) => {
    // Generate a unique path for each firefly
    const path = Array.from({ length: 5 }).map(() => ({
        x: Math.random() * 100 - 50, // relative movement
        y: Math.random() * 100 - 50
    }));

    return (
        <motion.div
            style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#ffd700', // Golden
                boxShadow: '0 0 10px #ffd700, 0 0 20px #ffaa00',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
            }}
            animate={{
                x: path.map(p => p.x),
                y: path.map(p => p.y),
                opacity: [0.5, 1, 0.5]
            }}
            transition={{
                duration: Math.random() * 10 + 10, // Very slow movement (10-20s)
                repeat: Infinity,
                ease: "linear",
                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            {/* Trail Spark Generator is tricky in Pure React without canvas/heavy state. 
                 Instead, we can add a simple "Trailing" tail using a pseudo-element or child 
                 that lags behind, OR we simulate the look with a long blurry shadow. 
                 Let's try a long blurry shadow first as it's performant. 
                 Or better, let's just emit particles.
             */}
            {/* <SparkTrail /> */}
        </motion.div>
    );
};

// Component to generate dropping sparks from the firefly
// const SparkTrail = () => {
//     const [sparks, setSparks] = useState([]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const id = Date.now();
//             setSparks(prev => [...prev.slice(-5), { id, left: 0, top: 0 }]); // Keep last 5 sparks related to parent
//             // Note: Position is tricky because parent moves. 
//             // Actually, dropping a trail behind a moving React component requires global coordinates 
//             // or Canvas. 
//             // A simpler visual trick: The firefly itself has a "tail".
//         }, 300);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <>
//             {/* 
//                True trail requires de-coupling from parent's transform, which is hard here.
//                Let's simulate "Golden Spark" by having the firefly ITSELF be a glowing orb 
//                and we add some floating particles in the background that shimmer.
//             */}
//         </>
//     );
// };

// Better approach for "Leave golden spark on the way":
// Since calculating absolute coordinates for trail is complex in pure CSS/Framer composition,
// We will make the BACKGROUND filled with static "Spark" particles that twinkle, 
// and the fireflies move among them.
// OR, we make the firefly have a long motion trail using `filter: blur()`.
// Let's try the "Firefly emits sparks" simplified: 
// Just animating a separate set of "falling" gold dust in the background 
// gives the illusion the fireflies might be causing them.

const MidnightSkySection = () => {
    const [animationPhase, setAnimationPhase] = useState('darkness'); // darkness → butterfly → sparks → exit → fireflies
    const [hasEntered, setHasEntered] = useState(false);

    const fireflies = Array.from({ length: 20 }).map((_, i) => i);

    // Golden dust/sparks background
    const sparks = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
    }));

    // Animation sequence timing
    useEffect(() => {
        if (hasEntered) {
            // Start with darkness for 1s
            const timer1 = setTimeout(() => {
                setAnimationPhase('butterfly');
            }, 1000);

            // Butterfly flaps and sparks appear
            const timer2 = setTimeout(() => {
                setAnimationPhase('sparks');
            }, 3000);

            // Butterfly exits
            const timer3 = setTimeout(() => {
                setAnimationPhase('exit');
            }, 5000);

            // Fireflies fade in
            const timer4 = setTimeout(() => {
                setAnimationPhase('fireflies');
            }, 7000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
                clearTimeout(timer4);
            };
        }
    }, [hasEntered]);

    return (
        <motion.div
            style={{
                height: '100vh',
                width: '100%',
                background: 'linear-gradient(to bottom, #000000, #0a1f3a)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#b0c4de'
            }}
            onViewportEnter={() => setHasEntered(true)}
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Complete Darkness Overlay */}
            <AnimatePresence>
                {animationPhase === 'darkness' && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#000000',
                            zIndex: 100
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Golden Butterfly */}
            <AnimatePresence>
                {(animationPhase === 'butterfly' || animationPhase === 'sparks' || animationPhase === 'exit') && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: animationPhase === 'exit' ? 0 : 1,
                            scale: animationPhase === 'exit' ? 0.3 : 1,
                            x: animationPhase === 'exit' ? 1000 : 0,
                            y: animationPhase === 'exit' ? -500 : 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: animationPhase === 'exit' ? 2 : 1,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: 'absolute',
                            zIndex: 50,
                            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))'
                        }}
                    >
                        {/* Butterfly with flapping wings */}
                        <motion.div
                            style={{
                                position: 'relative',
                                width: '80px',
                                height: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {/* Left Wing */}
                            <motion.div
                                animate={animationPhase === 'butterfly' || animationPhase === 'sparks' ? {
                                    rotateY: [0, -60, 0]
                                } : {}}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    position: 'absolute',
                                    left: '-20px',
                                    width: '40px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #ffd700 0%, #ffaa00 50%, #ff8c00 100%)',
                                    borderRadius: '50% 0 50% 50%',
                                    transformOrigin: 'right center',
                                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)'
                                }}
                            />

                            {/* Right Wing */}
                            <motion.div
                                animate={animationPhase === 'butterfly' || animationPhase === 'sparks' ? {
                                    rotateY: [0, 60, 0]
                                } : {}}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    position: 'absolute',
                                    right: '-20px',
                                    width: '40px',
                                    height: '50px',
                                    background: 'linear-gradient(225deg, #ffd700 0%, #ffaa00 50%, #ff8c00 100%)',
                                    borderRadius: '0 50% 50% 50%',
                                    transformOrigin: 'left center',
                                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)'
                                }}
                            />

                            {/* Body */}
                            <div style={{
                                position: 'absolute',
                                width: '8px',
                                height: '40px',
                                background: 'linear-gradient(180deg, #b8860b, #daa520)',
                                borderRadius: '4px',
                                zIndex: 10,
                                boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
                            }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Golden Sparks from Butterfly Wings */}
            <AnimatePresence>
                {animationPhase === 'sparks' && (
                    <>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <motion.div
                                key={`wing-spark-${i}`}
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                    x: (i % 2 === 0 ? -40 : 40), // Left or right wing
                                    y: 0
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                    x: (i % 2 === 0 ? -40 : 40) + (Math.random() - 0.5) * 200,
                                    y: Math.random() * 300 - 150,
                                    rotate: Math.random() * 360
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.05,
                                    ease: "easeOut"
                                }}
                                style={{
                                    position: 'absolute',
                                    width: '4px',
                                    height: '4px',
                                    backgroundColor: '#ffd700',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 10px #ffd700, 0 0 20px #ffaa00',
                                    zIndex: 40
                                }}
                            />
                        ))}
                    </>
                )}
            </AnimatePresence>

            {/* Title - fades in with fireflies */}
            <AnimatePresence>
                {animationPhase === 'fireflies' && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '3rem',
                            textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                            zIndex: 10
                        }}
                    >
                        Midnight Dreams
                    </motion.h2>
                )}
            </AnimatePresence>

            {/* Fireflies - fade in at the end */}
            <AnimatePresence>
                {animationPhase === 'fireflies' && (
                    <>
                        {fireflies.map(id => (
                            <motion.div
                                key={`firefly-${id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2, delay: id * 0.1 }}
                            >
                                <Firefly id={id} />
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>

            {/* Suspended Golden Sparks - fade in with fireflies */}
            <AnimatePresence>
                {animationPhase === 'fireflies' && (
                    <>
                        {sparks.map((spark) => (
                            <motion.div
                                key={spark.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.5 }}
                                style={{
                                    position: 'absolute',
                                    left: `${spark.left}%`,
                                    top: `${spark.top}%`,
                                    width: '2px',
                                    height: '2px',
                                    backgroundColor: '#ffd700',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 5px #ffd700'
                                }}
                            >
                                <motion.div
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.5, 0],
                                        y: [0, 20]
                                    }}
                                    transition={{
                                        duration: spark.duration,
                                        repeat: Infinity,
                                        delay: spark.delay,
                                        ease: "easeInOut"
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#ffd700',
                                        borderRadius: '50%'
                                    }}
                                />
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Home = () => {
    return (
        <div className="main-scroll-container" style={{ width: '100%', overflowX: 'hidden' }}>
            <HeroSection />
            <MidnightSkySection />
        </div>
    );
};

export default Home;
