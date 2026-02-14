import React, { useState, useEffect, useRef, useMemo } from 'react';
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
    const [heartBursts, setHeartBursts] = useState([]);
    const [rosePetals, setRosePetals] = useState([]);
    const burstIdRef = useRef(0);
    const petalIdRef = useRef(0);
    const lastPetalTime = useRef(0);

    // Bubbles configuration — stable via useMemo
    const bubbles = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 50 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5
    })), []);

    const handleHeartDoubleClick = () => {
        if (!isCelebrated) {
            setIsCelebrated(true);
            setTimeout(() => {
                setIsCelebrated(false);
            }, 6000);
        }
    };

    // Mouse move — drop rose petals (throttled)
    const handleMouseMove = (e) => {
        const now = Date.now();
        if (now - lastPetalTime.current < 60) return; // throttle
        lastPetalTime.current = now;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const petal = {
            id: petalIdRef.current++,
            x,
            y,
            size: 6 + Math.random() * 6,
            drift: (Math.random() - 0.5) * 40,
            rotation: Math.random() * 360,
            hue: 340 + Math.random() * 25,
            lightness: 50 + Math.random() * 20,
        };

        setRosePetals(prev => [...prev.slice(-20), petal]);

        setTimeout(() => {
            setRosePetals(prev => prev.filter(p => p.id !== petal.id));
        }, 1800);
    };

    // Click to burst tiny hearts + red petals
    const handleSectionClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const burstId = burstIdRef.current++;

        // Create hearts going in all directions
        const hearts = Array.from({ length: 12 }, (_, i) => ({
            id: `h-${burstId}-${i}`,
            angle: (i / 12) * 360 + (Math.random() - 0.5) * 30,
            distance: 40 + Math.random() * 80,
            size: 8 + Math.random() * 8,
            delay: Math.random() * 0.1,
        }));

        // Create red petals/leaves that drift down
        const petals = Array.from({ length: 8 }, (_, i) => ({
            id: `p-${burstId}-${i}`,
            offsetX: (Math.random() - 0.5) * 120,
            size: 4 + Math.random() * 6,
            delay: 0.2 + Math.random() * 0.3,
            drift: (Math.random() - 0.5) * 60,
        }));

        const burst = { id: burstId, x, y, hearts, petals };
        setHeartBursts(prev => [...prev, burst]);

        setTimeout(() => {
            setHeartBursts(prev => prev.filter(b => b.id !== burstId));
        }, 2000);
    };

    // Heart cursor SVG as data URI
    const heartCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='%23ff4d6d' stroke='%23ff1744' stroke-width='0.5'/%3E%3C/svg%3E") 12 12, pointer`;

    return (
        <motion.div
            className="home-container"
            onClick={handleSectionClick}
            onMouseMove={handleMouseMove}
            style={{
                userSelect: 'none',
                height: '100vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                cursor: heartCursor
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
            {/* Heart burst effects on click */}
            <AnimatePresence>
                {heartBursts.map(burst => (
                    <React.Fragment key={burst.id}>
                        {/* Tiny hearts exploding outward */}
                        {burst.hearts.map(heart => {
                            const rad = (heart.angle * Math.PI) / 180;
                            const tx = Math.cos(rad) * heart.distance;
                            const ty = Math.sin(rad) * heart.distance;
                            return (
                                <motion.div
                                    key={heart.id}
                                    initial={{ opacity: 1, scale: 1, x: burst.x, y: burst.y }}
                                    animate={{
                                        opacity: 0,
                                        scale: [1, 1.3, 0],
                                        x: burst.x + tx,
                                        y: burst.y + ty,
                                        rotate: Math.random() * 360
                                    }}
                                    transition={{
                                        duration: 0.8 + Math.random() * 0.4,
                                        delay: heart.delay,
                                        ease: "easeOut"
                                    }}
                                    style={{
                                        position: 'absolute',
                                        zIndex: 200,
                                        pointerEvents: 'none',
                                        fontSize: heart.size,
                                        color: `hsl(${340 + Math.random() * 30}, 90%, ${55 + Math.random() * 20}%)`,
                                        textShadow: '0 0 6px rgba(255, 50, 80, 0.6)',
                                        lineHeight: 1
                                    }}
                                >
                                    ♥
                                </motion.div>
                            );
                        })}

                        {/* Red petals drifting down */}
                        {burst.petals.map(petal => (
                            <motion.div
                                key={petal.id}
                                initial={{
                                    opacity: 0.9,
                                    scale: 1,
                                    x: burst.x + petal.offsetX,
                                    y: burst.y,
                                    rotate: 0
                                }}
                                animate={{
                                    opacity: 0,
                                    scale: [1, 0.8, 0.3],
                                    x: burst.x + petal.offsetX + petal.drift,
                                    y: burst.y + 80 + Math.random() * 60,
                                    rotate: (Math.random() - 0.5) * 360
                                }}
                                transition={{
                                    duration: 1.2,
                                    delay: petal.delay,
                                    ease: "easeOut"
                                }}
                                style={{
                                    position: 'absolute',
                                    width: petal.size,
                                    height: petal.size * 1.4,
                                    backgroundColor: `hsl(${350 + Math.random() * 15}, 80%, ${40 + Math.random() * 20}%)`,
                                    borderRadius: '50% 0 50% 50%',
                                    zIndex: 200,
                                    pointerEvents: 'none',
                                    boxShadow: '0 0 4px rgba(200, 30, 50, 0.4)'
                                }}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </AnimatePresence>

            {/* Rose petals falling from cursor */}
            <AnimatePresence>
                {rosePetals.map(petal => (
                    <motion.div
                        key={petal.id}
                        initial={{
                            opacity: 0.9,
                            scale: 1,
                            x: 0,
                            y: 0,
                            rotate: petal.rotation,
                        }}
                        animate={{
                            opacity: [0.9, 0.7, 0],
                            scale: [1, 0.85, 0.4],
                            x: petal.drift,
                            y: 100 + Math.random() * 50,
                            rotate: petal.rotation + (Math.random() > 0.5 ? 200 : -200),
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1.8,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        style={{
                            position: 'absolute',
                            left: petal.x,
                            top: petal.y,
                            width: petal.size,
                            height: petal.size * 1.5,
                            background: `radial-gradient(ellipse at 30% 30%, hsl(${petal.hue}, 80%, ${petal.lightness + 15}%), hsl(${petal.hue}, 70%, ${petal.lightness}%))`,
                            borderRadius: '50% 0% 50% 50%',
                            zIndex: 150,
                            pointerEvents: 'none',
                            boxShadow: `0 0 6px hsla(${petal.hue}, 70%, ${petal.lightness}%, 0.5)`,
                        }}
                    />
                ))}
            </AnimatePresence>
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

// Ornate Butterfly Component with Random Flight
const ButterflyOrnate = ({ startX, startY }) => {
    // Memoize random flight path so it never changes for this butterfly instance
    const flight = useMemo(() => ({
        path: [
            { x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 15 },
            { x: (Math.random() - 0.5) * 25, y: (Math.random() - 0.5) * 20 },
            { x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 18 },
            { x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 22 },
            { x: (Math.random() > 0.5 ? 1 : -1) * 40, y: -50 }
        ],
        sparkles: Array.from({ length: 4 }, () => ({
            cx: 30 + Math.random() * 60,
            cy: 35 + Math.random() * 30
        }))
    }), []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
                opacity: [0, 0.4, 1, 1, 1, 0.7, 0],
                scale: [0.3, 0.7, 1, 1.05, 1, 0.9, 0.5],
                x: [
                    0,
                    `${flight.path[0].x}vw`,
                    `${flight.path[1].x}vw`,
                    `${flight.path[2].x}vw`,
                    `${flight.path[3].x}vw`,
                    `${flight.path[4].x}vw`
                ],
                y: [
                    0,
                    `${flight.path[0].y}vh`,
                    `${flight.path[1].y}vh`,
                    `${flight.path[2].y}vh`,
                    `${flight.path[3].y}vh`,
                    `${flight.path[4].y}vh`
                ],
                rotate: [0, -6, 4, -4, 6, -8, 12]
            }}
            exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.5 } }}
            transition={{
                duration: 10,
                ease: [0.25, 0.1, 0.25, 1],
                times: [0, 0.08, 0.25, 0.45, 0.65, 0.85, 1]
            }}
            style={{
                position: 'absolute',
                left: `${startX}%`,
                top: `${startY}%`,
                zIndex: 50,
                pointerEvents: 'none',
                willChange: 'transform, opacity'
            }}
        >
            <svg
                width="120"
                height="100"
                viewBox="0 0 120 100"
                style={{
                    filter: 'drop-shadow(0 0 12px #ffd700) drop-shadow(0 0 6px #ffaa00)'
                }}
            >
                {/* Left Wing */}
                <motion.g
                    animate={{ scaleX: [1, 0.85, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: '60px 50px' }}
                >
                    <path
                        d="M 60,50 Q 40,35 25,30 Q 12,27 5,35 Q 0,42 2,52 Q 4,62 15,68 Q 25,72 38,68 Q 50,64 58,56 Z"
                        fill="none"
                        stroke="#ffd700"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <circle cx="22" cy="48" r="4" fill="none" stroke="#ffd700" strokeWidth="1.5" />
                    <circle cx="15" cy="42" r="2.5" fill="none" stroke="#ffd700" strokeWidth="1" />
                    <path d="M 30,40 Q 32,36 34,33" fill="none" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round" />
                </motion.g>

                {/* Right Wing */}
                <motion.g
                    animate={{ scaleX: [1, 0.85, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: '60px 50px' }}
                >
                    <path
                        d="M 60,50 Q 80,35 95,30 Q 108,27 115,35 Q 120,42 118,52 Q 116,62 105,68 Q 95,72 82,68 Q 70,64 62,56 Z"
                        fill="none"
                        stroke="#ffd700"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <circle cx="98" cy="48" r="4" fill="none" stroke="#ffd700" strokeWidth="1.5" />
                    <circle cx="105" cy="42" r="2.5" fill="none" stroke="#ffd700" strokeWidth="1" />
                    <path d="M 90,40 Q 88,36 86,33" fill="none" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round" />
                </motion.g>

                {/* Body */}
                <ellipse cx="60" cy="52" rx="3" ry="18" fill="none" stroke="#ffd700" strokeWidth="2.5" />
                <circle cx="60" cy="38" r="2.5" fill="#ffd700" />

                {/* Antennae */}
                <path d="M 58,36 Q 56,30 54,26" fill="none" stroke="#ffd700" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 62,36 Q 64,30 66,26" fill="none" stroke="#ffd700" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="54" cy="25" r="1.5" fill="#ffd700" />
                <circle cx="66" cy="25" r="1.5" fill="#ffd700" />

                {/* Sparkles - positions are stable via useMemo */}
                {flight.sparkles.map((s, i) => (
                    <motion.circle
                        key={i}
                        cx={s.cx}
                        cy={s.cy}
                        r="1"
                        fill="#fff"
                        animate={{
                            opacity: [0, 1, 0],
                            r: [0.5, 2, 0.5]
                        }}
                        transition={{
                            duration: 1.2,
                            delay: i * 0.3,
                            repeat: Infinity
                        }}
                    />
                ))}
            </svg>
        </motion.div>
    );
};


// Isolated sparkle trail — its state changes won't re-render the parent
const WandSparkleTrail = ({ sectionRef }) => {
    const [sparks, setSparks] = useState([]);
    const sparkIdRef = useRef(0);
    const lastSparkTime = useRef(0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastSparkTime.current < 120) return;
            lastSparkTime.current = now;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const newSpark = {
                id: sparkIdRef.current++,
                x,
                y,
                size: 2 + Math.random() * 3,
                drift: (Math.random() - 0.5) * 20,
                hue: 40 + Math.random() * 15,
                fallY: 60 + Math.random() * 40,
                fallRotation: Math.random() * 180,
                isRound: Math.random() > 0.5,
            };

            setSparks(prev => [...prev.slice(-8), newSpark]);

            setTimeout(() => {
                setSparks(prev => prev.filter(s => s.id !== newSpark.id));
            }, 1000);
        };

        el.addEventListener('mousemove', handleMouseMove);
        return () => el.removeEventListener('mousemove', handleMouseMove);
    }, [sectionRef]);

    return (
        <AnimatePresence>
            {sparks.map(spark => (
                <motion.div
                    key={spark.id}
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                    animate={{
                        opacity: [1, 0.8, 0],
                        scale: [1, 0.7, 0.2],
                        x: spark.drift,
                        y: spark.fallY,
                        rotate: spark.fallRotation,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                        position: 'absolute',
                        left: spark.x,
                        top: spark.y,
                        width: spark.size,
                        height: spark.size,
                        background: `radial-gradient(circle, hsl(${spark.hue}, 100%, 75%) 0%, hsl(${spark.hue}, 90%, 55%) 100%)`,
                        borderRadius: spark.isRound ? '50%' : '2px',
                        boxShadow: `0 0 8px hsl(${spark.hue}, 100%, 65%), 0 0 16px rgba(255, 215, 0, 0.3)`,
                        pointerEvents: 'none',
                        zIndex: 100
                    }}
                />
            ))}
        </AnimatePresence>
    );
};

const MidnightSkySection = () => {
    const [butterflies, setButterflies] = useState([]);
    const [nextId, setNextId] = useState(0);
    const [showFireflies, setShowFireflies] = useState(false);
    const sectionRef = useRef(null);

    const fireflies = useMemo(() => Array.from({ length: 20 }).map((_, i) => i), []);

    // Golden dust/sparks background — stable via useMemo so they don't jump on re-render
    const sparks = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
    })), []);

    // Magic wand cursor SVG as data URI
    const wandCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cline x1='8' y1='24' x2='22' y2='10' stroke='%23b8860b' stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='8' y1='24' x2='22' y2='10' stroke='%23ffd700' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpolygon points='22,10 26,4 24,8 28,6 24,10 26,12' fill='%23ffd700'/%3E%3Ccircle cx='27' cy='5' r='2' fill='%23fff8dc' opacity='0.9'/%3E%3Ccircle cx='25' cy='3' r='1' fill='%23ffd700'/%3E%3Ccircle cx='29' cy='7' r='1' fill='%23ffd700'/%3E%3C/svg%3E") 4 28, pointer`;

    // Show fireflies after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFireflies(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Handle click to spawn butterfly near center
    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = ((e.clientX - rect.left) / rect.width) * 100;
        const clickY = ((e.clientY - rect.top) / rect.height) * 100;

        // Spawn near the click but bias towards center
        const biasedX = clickX * 0.6 + 50 * 0.4;
        const biasedY = clickY * 0.6 + 45 * 0.4;

        const newButterfly = {
            id: nextId,
            startX: biasedX,
            startY: biasedY,
        };

        setButterflies(prev => [...prev, newButterfly]);
        setNextId(prev => prev + 1);

        // Remove butterfly after animation completes (10s + buffer)
        setTimeout(() => {
            setButterflies(prev => prev.filter(b => b.id !== newButterfly.id));
        }, 11000);
    };

    return (
        <div
            ref={sectionRef}
            onClick={handleClick}
            style={{
                height: '100vh',
                width: '100%',
                background: 'linear-gradient(to bottom, #000000, #0a1f3a)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#b0c4de',
                cursor: wandCursor
            }}
        >
            {/* Clickable butterflies */}
            <AnimatePresence>
                {butterflies.map(butterfly => (
                    <ButterflyOrnate
                        key={butterfly.id}
                        startX={butterfly.startX}
                        startY={butterfly.startY}
                    />
                ))}
            </AnimatePresence>

            {/* Golden sparkles — isolated component, won't re-render parent */}
            <WandSparkleTrail sectionRef={sectionRef} />

            {/* Moon - pearl white with slight yellow tint */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3, ease: 'easeOut', delay: 1 }}
                style={{
                    position: 'absolute',
                    top: '8%',
                    right: '12%',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 40% 35%, #fffef5 0%, #fdf8e8 40%, #f5edd4 70%, #e8dfc0 100%)',
                    boxShadow: `
                        0 0 30px rgba(255, 253, 240, 0.5),
                        0 0 60px rgba(255, 250, 220, 0.3),
                        0 0 100px rgba(255, 245, 200, 0.15),
                        inset -8px -4px 15px rgba(230, 220, 190, 0.4)
                    `,
                    zIndex: 3,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}
            >
                {/* Moon craters */}
                <div style={{
                    position: 'absolute', left: '25%', top: '20%',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(220, 215, 195, 0.5) 0%, transparent 70%)',
                }} />
                <div style={{
                    position: 'absolute', left: '55%', top: '45%',
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(220, 215, 195, 0.4) 0%, transparent 70%)',
                }} />
                <div style={{
                    position: 'absolute', left: '35%', top: '60%',
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(220, 215, 195, 0.35) 0%, transparent 70%)',
                }} />
                <div style={{
                    position: 'absolute', left: '65%', top: '25%',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(220, 215, 195, 0.3) 0%, transparent 70%)',
                }} />
            </motion.div>
            {/* Title - cute font */}
            <AnimatePresence>
                {showFireflies && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        style={{
                            fontFamily: '"Dancing Script", "Pacifico", cursive',
                            fontSize: '3.2rem',
                            fontWeight: 700,
                            color: '#ffd700',
                            textShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.2)',
                            zIndex: 10,
                            pointerEvents: 'none',
                            letterSpacing: '2px'
                        }}
                    >
                        Midnight Dreams
                    </motion.h2>
                )}
            </AnimatePresence>

            {/* Fireflies - fade in at the end */}
            <AnimatePresence>
                {showFireflies && (
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

            {/* Suspended Golden Sparks - CSS only, won't re-render on state changes */}
            {showFireflies && sparks.map((spark) => (
                <div
                    key={spark.id}
                    style={{
                        position: 'absolute',
                        left: `${spark.left}%`,
                        top: `${spark.top}%`,
                        width: '2px',
                        height: '2px',
                        backgroundColor: '#ffd700',
                        borderRadius: '50%',
                        boxShadow: '0 0 5px #ffd700',
                        animation: `sparkTwinkle ${spark.duration}s ${spark.delay}s ease-in-out infinite`,
                        pointerEvents: 'none',
                    }}
                />
            ))}
        </div>
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
