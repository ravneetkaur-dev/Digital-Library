import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { 
  Container, 
  Navbar, 
  Nav, 
  Button, 
  Card, 
  Row, 
  Col, 
  Badge,
  Carousel
} from 'react-bootstrap';
import { 
  FaBook, 
  FaSearch, 
  FaUserGraduate, 
  FaCode, 
  FaChalkboardTeacher, 
  FaCalendarAlt, 
  FaRegNewspaper, 
  FaDatabase, 
  FaHeadphones,
  FaChevronRight,
  FaStar,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBars
} from 'react-icons/fa';
import { 
  FiBookOpen, 
  FiAward, 
  FiUsers,
  FiTrendingUp 
} from 'react-icons/fi';
import { NavBar } from '../components/Navbar/NavBar';
import { HeroSection } from '../components/Home/Hero';
import {Departments} from '../components/Home/Departments';
import {FeaturesSection} from '../components/Home/Features';
import {ReferencesSection} from '../components/Home/References';
import {TestimonialsSection} from '../components/Home/Messages';
import {CTASection} from '../components/Home/CTASection';
import {Footer} from '../components/Footer/Footer';
import './home.css';

export const Home = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <NavBar />
      <HeroSection />
      <Departments />
      <FeaturesSection />
      <ReferencesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

