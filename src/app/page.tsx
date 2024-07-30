'use client';
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"

import { signOut, useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession();

  return (
    <main>

      <section className="header-hero"
        style={{
          backgroundImage: "url('/praying.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
      
      <Hero />
      </section>
      <Footer />
   
    </main>
  );
}
