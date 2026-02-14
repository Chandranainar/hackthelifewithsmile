import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Mail,
    Feather,
    BookOpen,
    FlaskConical,
    Music,
    Clock,
    Menu,
    X
} from 'lucide-react';
import '../index.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const links = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        { name: 'Letters', path: '/letters', icon: <Mail size={20} /> },
        { name: 'Poems', path: '/poems', icon: <Feather size={20} /> },
        { name: 'Philosophy', path: '/philosophy', icon: <BookOpen size={20} /> },
        { name: 'Lab', path: '/lab', icon: <FlaskConical size={20} /> },
        { name: 'Music', path: '/music', icon: <Music size={20} /> },
        { name: 'Now', path: '/now', icon: <Clock size={20} /> },
    ];

    const sidebarVariants = {
        open: {
            width: 250,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        closed: {
            width: 80,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    return (
        <motion.div
            className="sidebar"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={sidebarVariants}
        >
            <div className="sidebar-header">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <nav>
                <ul>
                    {links.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active-link" : ""}`
                                }
                            >
                                <span className="icon">{link.icon}</span>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.span
                                            className="link-text"
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {link.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </motion.div>
    );
};

export default Sidebar;
