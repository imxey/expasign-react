import Footer from '../components/footer';
import { usePageInteractions } from '../hooks/usePageInteractions';
// import React, { useState, useEffect, useRef, ReactNode } from "react";

export default function About() {
  usePageInteractions({
    smoothScroll: true,
    parallaxSelector: ".absolute.inset-0",
    parallaxSpeed: 0.5,
    burgerId: "burger",
    navLinksId: "nav-links",
  });
return (
    <>
      <div
        className="flex min-h-screen flex-col items-center justify-start bg-gray-900 text-white pt-[30px]"
        style={{
          fontFamily: 'Orbitron',
          fontWeight: 400,
          background:
            'linear-gradient(90deg, rgba(30, 58, 138, 0.20) 0%, rgba(0, 0, 0, 0.50) 100%)',
        }}
      >

      </div>
      <Footer />    
    </>)};