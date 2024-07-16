import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"

export default function Home() {
  return (
    <main>
      <section className="header-hero"
        style={{
          backgroundImage: "url('/praying.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
      <Header />
      <Hero />
      </section>
      <Footer />
   
    </main>
  );
}
