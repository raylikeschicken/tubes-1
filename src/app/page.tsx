'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorks from '@/components/sections/HowItWorks';
import TopUpSection from '@/components/sections/TopUpSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <TopUpSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
