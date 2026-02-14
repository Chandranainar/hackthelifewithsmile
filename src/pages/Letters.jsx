import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Glowing pearl flower component
const PearlFlower = ({ x, y, size, delay, petalCount = 5 }) => {
    const petals = useMemo(() =>
        Array.from({ length: petalCount }, (_, i) => ({
            angle: (i / petalCount) * 360,
            length: size * 0.4 + Math.random() * size * 0.15,
        })), [petalCount, size]
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: 1
            }}
            transition={{
                opacity: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay },
                scale: { duration: 1.5, delay, ease: "easeOut" }
            }}
            style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                zIndex: 1,
                pointerEvents: 'none',
            }}
        >
            {petals.map((petal, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: petal.length,
                        height: petal.length * 0.6,
                        background: 'radial-gradient(ellipse, rgba(255, 250, 240, 0.5) 0%, rgba(230, 220, 210, 0.2) 60%, transparent 100%)',
                        borderRadius: '50%',
                        transform: `translate(-50%, -50%) rotate(${petal.angle}deg) translateX(${size * 0.2}px)`,
                        boxShadow: '0 0 8px rgba(255, 250, 245, 0.3)',
                    }}
                />
            ))}
            {/* Center glow */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: size * 0.2,
                height: size * 0.2,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 250, 230, 0.8) 0%, rgba(255, 245, 220, 0.3) 70%, transparent 100%)',
                boxShadow: '0 0 12px rgba(255, 250, 230, 0.5)',
            }} />
        </motion.div>
    );
};

const Letters = () => {
    const [selectedLetter, setSelectedLetter] = useState(null);

    // Pearl flowers — stable positions
    const flowers = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 90,
        size: 30 + Math.random() * 50,
        delay: Math.random() * 3,
        petalCount: Math.random() > 0.5 ? 5 : 6,
    })), []);

    // Sample letters
    const letters = [
        {
            id: 1,
            title: "A Letter to You",
            date: "February 14, 2026",
            preview: "There are words I've kept inside for so long...",
            content: `There are words I've kept inside for so long, waiting for the right moment to let them breathe. Today feels like that moment.

Every time I see you smile, the world becomes a little brighter. Every time you laugh, it sounds like music I never want to stop hearing. You are the poem I never knew I was writing, the melody I've been humming all my life.

I want you to know that in a world full of temporary things, my feelings for you are permanent. They are written in the stars, carved into the moon, and whispered by the wind.

You are my favorite chapter in this book of life.

With all my heart,
Forever yours`
        },
        {
            id: 2,
            title: "Words Unsaid",
            date: "February 10, 2026",
            preview: "Some things are too beautiful to say out loud...",
            content: `Some things are too beautiful to say out loud. They live in the silence between two heartbeats, in the way eyes meet across a room, in the gentle brush of a hand.

These words are for the quiet moments — when the world sleeps and only the moon listens. For the times when I look at you and feel like I've found something I didn't even know I was searching for.

You make the ordinary extraordinary. A simple cup of coffee becomes a memory. A rainy afternoon becomes poetry. A regular Tuesday becomes the best day of my life.

Thank you for being you.

Always,
Yours truly`
        },
        {
            id: 3,
            title: "To the Stars",
            date: "February 5, 2026",
            preview: "If I could write your name across the sky...",
            content: `If I could write your name across the sky, I would. Not because the world needs to know, but because even the stars should be jealous of something so beautiful.

You came into my life like a gentle breeze — unexpected, refreshing, and absolutely necessary. Before you, I didn't know what I was missing. Now, I can't imagine a single day without your warmth.

They say home is a place, but I think they're wrong. Home is a person. And you, my dear, are my home.

Every letter I write is a love letter. Every word I speak is a prayer. Every breath I take is for you.

Under the same stars,
Always yours`
        }
    ];

    const [showScrollHint, setShowScrollHint] = useState(true);
    const containerRef = useRef(null);

    // Hide scroll hint once user scrolls down
    useEffect(() => {
        const container = document.querySelector('.main-content');
        if (!container) return;
        const handleScroll = () => {
            if (container.scrollTop > 80) {
                setShowScrollHint(false);
            } else {
                setShowScrollHint(true);
            }
        };
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    // Custom scrollbar styles
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .main-content::-webkit-scrollbar {
                width: 8px;
            }
            .main-content::-webkit-scrollbar-track {
                background: rgba(200, 220, 195, 0.2);
            }
            .main-content::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, rgba(140, 180, 140, 0.5), rgba(170, 200, 160, 0.6));
                border-radius: 10px;
            }
            .main-content::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, rgba(120, 160, 120, 0.7), rgba(150, 185, 145, 0.8));
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div ref={containerRef} style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Dancing Script", "Georgia", serif',
        }}>
            {/* Mild green organic background with uneven texture */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
                    radial-gradient(ellipse at 20% 30%, rgba(144, 180, 148, 0.5) 0%, transparent 50%),
                    radial-gradient(ellipse at 75% 20%, rgba(160, 195, 155, 0.4) 0%, transparent 45%),
                    radial-gradient(ellipse at 40% 70%, rgba(130, 170, 135, 0.5) 0%, transparent 55%),
                    radial-gradient(ellipse at 85% 75%, rgba(150, 185, 145, 0.4) 0%, transparent 50%),
                    radial-gradient(ellipse at 10% 80%, rgba(140, 175, 140, 0.3) 0%, transparent 40%),
                    radial-gradient(ellipse at 55% 40%, rgba(165, 200, 160, 0.3) 0%, transparent 45%),
                    linear-gradient(160deg, #e8f0e4 0%, #d4e4d0 25%, #dce8d6 50%, #e0ead8 75%, #e6f0e0 100%)
                `,
                zIndex: 0,
            }} />

            {/* Subtle organic noise overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
                    radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 30%),
                    radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 25%),
                    radial-gradient(circle at 50% 80%, rgba(255,255,255,0.12) 0%, transparent 35%),
                    radial-gradient(circle at 15% 15%, rgba(180,200,175,0.2) 0%, transparent 20%),
                    radial-gradient(circle at 90% 60%, rgba(180,200,175,0.15) 0%, transparent 25%)
                `,
                zIndex: 0,
                pointerEvents: 'none',
            }} />

            {/* Glowing pearl flowers */}
            {flowers.map(f => (
                <PearlFlower
                    key={f.id}
                    x={f.x}
                    y={f.y}
                    size={f.size}
                    delay={f.delay}
                    petalCount={f.petalCount}
                />
            ))}

            {/* Main content */}
            <div style={{
                position: 'relative',
                zIndex: 5,
                padding: '60px 20px',
                maxWidth: '900px',
                margin: '0 auto',
            }}>
                {/* Page title */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                        fontFamily: '"Dancing Script", cursive',
                        fontSize: '3.5rem',
                        fontWeight: 700,
                        color: '#4a6b4a',
                        textAlign: 'center',
                        marginBottom: '50px',
                        textShadow: '0 2px 8px rgba(100, 140, 100, 0.2)',
                        letterSpacing: '2px',
                    }}
                >
                    My Letters
                </motion.h1>

                {/* Scroll down indicator */}
                <AnimatePresence>
                    {showScrollHint && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginBottom: '40px',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                const container = document.querySelector('.main-content');
                                if (container) container.scrollBy({ top: 300, behavior: 'smooth' });
                            }}
                        >
                            {/* Bouncing leaf/arrow */}
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ fontSize: '1.6rem', marginBottom: '6px' }}
                            >
                                🍃
                            </motion.div>
                            <p style={{
                                fontFamily: '"Georgia", serif',
                                fontSize: '0.75rem',
                                color: '#8a9f8a',
                                fontStyle: 'italic',
                                letterSpacing: '2px',
                                margin: 0,
                                textTransform: 'lowercase',
                            }}>
                                scroll down
                            </p>
                            {/* Thin decorative line */}
                            <motion.div
                                animate={{ scaleY: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    width: '1px',
                                    height: '30px',
                                    background: 'linear-gradient(180deg, rgba(140, 170, 140, 0.5), transparent)',
                                    marginTop: '8px',
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Letter cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {letters.map((letter, index) => (
                        <motion.div
                            key={letter.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: "easeOut" }}
                            onClick={() => setSelectedLetter(letter)}
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,252,245,0.92) 0%, rgba(250,245,235,0.88) 50%, rgba(255,250,240,0.9) 100%)',
                                borderRadius: '4px',
                                padding: '35px 40px',
                                cursor: 'pointer',
                                position: 'relative',
                                boxShadow: '0 4px 20px rgba(100, 130, 100, 0.12), 0 1px 4px rgba(0,0,0,0.06)',
                                border: '1px solid rgba(180, 200, 175, 0.3)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                overflow: 'hidden',
                            }}
                            whileHover={{
                                y: -4,
                                boxShadow: '0 8px 30px rgba(100, 130, 100, 0.2), 0 2px 6px rgba(0,0,0,0.08)',
                            }}
                        >
                            {/* Folded corner effect */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '30px',
                                height: '30px',
                                background: 'linear-gradient(225deg, rgba(200, 220, 195, 0.6) 50%, transparent 50%)',
                            }} />

                            {/* Red wax seal */}
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle at 40% 35%, #e85050, #b03030)',
                                boxShadow: '0 2px 6px rgba(150, 30, 30, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                color: 'rgba(255,255,255,0.8)',
                            }}>♥</div>

                            <div style={{ marginLeft: '35px' }}>
                                <h3 style={{
                                    fontFamily: '"Dancing Script", cursive',
                                    fontSize: '1.6rem',
                                    fontWeight: 700,
                                    color: '#4a5a4a',
                                    margin: '0 0 6px 0',
                                }}>
                                    {letter.title}
                                </h3>
                                <p style={{
                                    fontFamily: '"Georgia", serif',
                                    fontSize: '0.8rem',
                                    color: '#8a9a8a',
                                    margin: '0 0 12px 0',
                                    fontStyle: 'italic',
                                    letterSpacing: '1px',
                                }}>
                                    {letter.date}
                                </p>
                                <p style={{
                                    fontFamily: '"Georgia", serif',
                                    fontSize: '1rem',
                                    color: '#6a7a6a',
                                    margin: 0,
                                    lineHeight: 1.6,
                                }}>
                                    {letter.preview}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Letter modal — opens like unfolding a letter */}
            <AnimatePresence>
                {selectedLetter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedLetter(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(60, 80, 60, 0.4)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 1000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '20px',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'linear-gradient(170deg, #fefcf6 0%, #faf5eb 30%, #fdf9f0 60%, #fefcf5 100%)',
                                borderRadius: '4px',
                                padding: '50px 55px',
                                maxWidth: '650px',
                                width: '100%',
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                boxShadow: '0 15px 50px rgba(80, 100, 80, 0.2), 0 3px 10px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(200, 210, 195, 0.4)',
                                position: 'relative',
                            }}
                        >
                            {/* Wax seal on letter */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '25px',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle at 40% 35%, #e85050, #a02828)',
                                boxShadow: '0 3px 10px rgba(150, 30, 30, 0.35)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                color: 'rgba(255,255,255,0.85)',
                            }}>♥</div>

                            {/* Close hint */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                transition={{ delay: 1 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    right: '25px',
                                    fontFamily: '"Georgia", serif',
                                    fontSize: '0.7rem',
                                    color: '#aaa',
                                    fontStyle: 'italic',
                                }}
                            >
                                click outside to close
                            </motion.p>

                            <h2 style={{
                                fontFamily: '"Dancing Script", cursive',
                                fontSize: '2.2rem',
                                fontWeight: 700,
                                color: '#4a5a4a',
                                margin: '0 0 8px 0',
                            }}>
                                {selectedLetter.title}
                            </h2>

                            <p style={{
                                fontFamily: '"Georgia", serif',
                                fontSize: '0.85rem',
                                color: '#9aaa9a',
                                fontStyle: 'italic',
                                margin: '0 0 30px 0',
                                letterSpacing: '1px',
                            }}>
                                {selectedLetter.date}
                            </p>

                            {/* Decorative line */}
                            <div style={{
                                width: '60px',
                                height: '1px',
                                background: 'linear-gradient(90deg, transparent, rgba(150, 170, 150, 0.5), transparent)',
                                margin: '0 0 30px 0',
                            }} />

                            {/* Letter body */}
                            <div style={{
                                fontFamily: '"Georgia", serif',
                                fontSize: '1.05rem',
                                lineHeight: 2,
                                color: '#4a5a4a',
                                whiteSpace: 'pre-line',
                                letterSpacing: '0.3px',
                            }}>
                                {selectedLetter.content}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Letters;
