import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Single Piano Key component
const PianoKey = ({ index, isBlack, left, onClick }) => {
    const [pressed, setPressed] = useState(false);

    const handlePress = (e) => {
        e.stopPropagation();
        setPressed(true);
        if (onClick) onClick(index, isBlack);
        setTimeout(() => setPressed(false), 300);
    };

    if (isBlack) {
        return (
            <motion.div
                onClick={handlePress}
                animate={pressed ? { scale: 0.97, y: 2 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: 0,
                    width: '3.2%',
                    height: '60%',
                    background: pressed
                        ? 'linear-gradient(180deg, #1a1a1a 0%, #333 100%)'
                        : 'linear-gradient(180deg, #2a2a2a 0%, #111 90%, #000 100%)',
                    borderRadius: '0 0 4px 4px',
                    zIndex: 2,
                    cursor: 'pointer',
                    boxShadow: pressed
                        ? '0 2px 3px rgba(0,0,0,0.4)'
                        : '0 4px 8px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.05)',
                }}
            />
        );
    }

    return (
        <motion.div
            onClick={handlePress}
            animate={pressed ? { scale: 0.99, y: 1 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            style={{
                position: 'absolute',
                left: `${left}%`,
                top: 0,
                width: '4.76%',
                height: '100%',
                background: pressed
                    ? 'linear-gradient(180deg, #e8e4df 0%, #d8d4cf 100%)'
                    : 'linear-gradient(180deg, #faf8f5 0%, #f0ede8 70%, #e8e4df 100%)',
                borderRight: '1px solid rgba(180, 170, 160, 0.4)',
                borderRadius: '0 0 5px 5px',
                zIndex: 1,
                cursor: 'pointer',
                boxShadow: pressed
                    ? 'inset 0 2px 8px rgba(0,0,0,0.1)'
                    : 'inset 0 -4px 6px rgba(0,0,0,0.05)',
            }}
        />
    );
};

// Floating music note component
const FloatingNote = ({ x, delay }) => {
    const noteChars = ['♪', '♫', '♬', '♩'];
    const note = useMemo(() => noteChars[Math.floor(Math.random() * noteChars.length)], []);
    const drift = useMemo(() => (Math.random() - 0.5) * 60, []);
    const size = useMemo(() => 14 + Math.random() * 16, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
                opacity: [0, 0.6, 0.4, 0],
                y: -120 - Math.random() * 80,
                x: drift,
                rotate: (Math.random() - 0.5) * 40,
            }}
            transition={{ duration: 3 + Math.random() * 2, delay, ease: 'easeOut' }}
            style={{
                position: 'absolute',
                left: `${x}%`,
                bottom: '28%',
                fontSize: size,
                color: 'rgba(255, 215, 150, 0.5)',
                pointerEvents: 'none',
                zIndex: 5,
                textShadow: '0 0 10px rgba(255, 200, 100, 0.3)',
            }}
        >
            {note}
        </motion.div>
    );
};

const Music = () => {
    const [ripples, setRipples] = useState([]);
    const [rippleId, setRippleId] = useState(0);

    // Background ambient notes
    const ambientNotes = useMemo(() =>
        Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: 5 + Math.random() * 90,
            delay: Math.random() * 8,
        })), []
    );

    // Piano keys layout — 21 white keys (3 octaves)
    const pianoKeys = useMemo(() => {
        const keys = [];
        const whiteKeyWidth = 100 / 21;
        // White keys
        for (let i = 0; i < 21; i++) {
            keys.push({ index: i, isBlack: false, left: i * whiteKeyWidth });
        }
        // Black keys pattern per octave: positions after keys 0,1,3,4,5 (C#,D#,F#,G#,A#)
        const blackPattern = [0, 1, 3, 4, 5];
        for (let octave = 0; octave < 3; octave++) {
            blackPattern.forEach(pos => {
                const whiteIndex = octave * 7 + pos;
                const blackLeft = (whiteIndex + 1) * whiteKeyWidth - whiteKeyWidth * 0.34;
                keys.push({ index: 100 + octave * 5 + pos, isBlack: true, left: blackLeft });
            });
        }
        return keys;
    }, []);

    // Handle key press — create a ripple effect
    const handleKeyPress = (index, isBlack) => {
        const newRipple = {
            id: rippleId,
            x: 20 + Math.random() * 60,
            color: isBlack ? 'rgba(255, 200, 100, 0.3)' : 'rgba(255, 255, 255, 0.2)',
        };
        setRipples(prev => [...prev, newRipple]);
        setRippleId(prev => prev + 1);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 2000);
    };

    // Custom scrollbar
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .main-content::-webkit-scrollbar { width: 6px; }
            .main-content::-webkit-scrollbar-track { background: rgba(20, 15, 30, 0.3); }
            .main-content::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, rgba(255, 200, 100, 0.3), rgba(200, 150, 80, 0.4));
                border-radius: 10px;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Dark warm background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
                    radial-gradient(ellipse at 50% 30%, rgba(40, 25, 50, 1) 0%, transparent 60%),
                    radial-gradient(ellipse at 20% 80%, rgba(30, 20, 40, 0.8) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 70%, rgba(35, 22, 45, 0.6) 0%, transparent 40%),
                    linear-gradient(180deg, #0d0a14 0%, #15101f 40%, #1a1228 70%, #0d0a14 100%)
                `,
                zIndex: 0,
            }} />

            {/* Subtle warm glow overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
                    radial-gradient(circle at 50% 85%, rgba(255, 200, 100, 0.05) 0%, transparent 40%),
                    radial-gradient(circle at 30% 50%, rgba(200, 150, 100, 0.03) 0%, transparent 30%),
                    radial-gradient(circle at 70% 40%, rgba(200, 150, 100, 0.03) 0%, transparent 30%)
                `,
                zIndex: 0,
                pointerEvents: 'none',
            }} />

            {/* Floating music notes — ambient */}
            {ambientNotes.map(note => (
                <FloatingNote key={note.id} x={note.x} delay={note.delay} />
            ))}

            {/* Key press ripples */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        initial={{ opacity: 0.6, scale: 0 }}
                        animate={{ opacity: 0, scale: 3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        style={{
                            position: 'fixed',
                            left: `${ripple.x}%`,
                            top: '50%',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: ripple.color,
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            zIndex: 4,
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Main content */}
            <div style={{
                position: 'relative',
                zIndex: 5,
                padding: '60px 20px 250px',
                maxWidth: '900px',
                margin: '0 auto',
                textAlign: 'center',
            }}>
                {/* Page title */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{
                        fontFamily: '"Dancing Script", cursive',
                        fontSize: '3.5rem',
                        fontWeight: 700,
                        color: '#ffd799',
                        textShadow: '0 0 30px rgba(255, 200, 100, 0.3)',
                        marginBottom: '10px',
                        letterSpacing: '2px',
                    }}
                >
                    Music
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    style={{
                        fontFamily: '"Georgia", serif',
                        fontSize: '1rem',
                        color: '#b8a8c8',
                        fontStyle: 'italic',
                        marginBottom: '50px',
                        letterSpacing: '1px',
                    }}
                >
                    every note tells a story
                </motion.p>

                {/* Playlist / songs area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                    {[
                        { title: 'Moonlight Sonata', artist: 'Beethoven', duration: '5:34' },
                        { title: 'Clair de Lune', artist: 'Debussy', duration: '4:52' },
                        { title: 'River Flows in You', artist: 'Yiruma', duration: '3:48' },
                        { title: 'Nocturne Op. 9 No. 2', artist: 'Chopin', duration: '4:33' },
                        { title: 'A Thousand Years', artist: 'Christina Perri', duration: '4:45' },
                    ].map((song, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                            whileHover={{
                                x: 4,
                                backgroundColor: 'rgba(255, 200, 100, 0.08)',
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '18px 24px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 200, 100, 0.08)',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span style={{
                                    fontSize: '1.2rem',
                                    color: 'rgba(255, 200, 100, 0.5)',
                                }}>♪</span>
                                <div style={{ textAlign: 'left' }}>
                                    <p style={{
                                        fontFamily: '"Georgia", serif',
                                        fontSize: '1rem',
                                        color: '#e8ddd0',
                                        margin: '0 0 3px 0',
                                        fontWeight: 500,
                                    }}>{song.title}</p>
                                    <p style={{
                                        fontFamily: '"Georgia", serif',
                                        fontSize: '0.8rem',
                                        color: '#8a7a9a',
                                        margin: 0,
                                        fontStyle: 'italic',
                                    }}>{song.artist}</p>
                                </div>
                            </div>
                            <span style={{
                                fontFamily: '"Georgia", serif',
                                fontSize: '0.85rem',
                                color: '#6a5a7a',
                                letterSpacing: '1px',
                            }}>{song.duration}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Piano keyboard at bottom */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '22vh',
                    maxHeight: '180px',
                    zIndex: 10,
                }}
            >
                {/* Warm glow from piano */}
                <div style={{
                    position: 'absolute',
                    top: '-40px',
                    left: 0,
                    width: '100%',
                    height: '40px',
                    background: 'linear-gradient(180deg, transparent, rgba(255, 200, 100, 0.04))',
                    pointerEvents: 'none',
                }} />

                {/* Piano body */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, #1a1520 0%, #0f0c14 100%)',
                    borderTop: '3px solid rgba(255, 200, 100, 0.15)',
                    boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.5)',
                }}>
                    {/* Keys container */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: 'calc(100% - 8px)',
                        marginTop: '4px',
                        padding: '0 2%',
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                        }}>
                            {/* White keys first, then black keys on top */}
                            {pianoKeys.filter(k => !k.isBlack).map(key => (
                                <PianoKey
                                    key={`w-${key.index}`}
                                    index={key.index}
                                    isBlack={false}
                                    left={key.left}
                                    onClick={handleKeyPress}
                                />
                            ))}
                            {pianoKeys.filter(k => k.isBlack).map(key => (
                                <PianoKey
                                    key={`b-${key.index}`}
                                    index={key.index}
                                    isBlack={true}
                                    left={key.left}
                                    onClick={handleKeyPress}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Music;
