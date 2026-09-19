import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Roles from "./Roles";
import CTA from "./CTA";
import Footer from "./Footer";

const Home = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Navbar />

            <main>
                <Hero />
                <Features />
                <Roles />
                <CTA />
            </main>

            <Footer />
        </div>
    );
}
export default Home;