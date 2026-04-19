"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

import { useGsapScrollTrigger } from "@/hooks/useGsapScrollTrigger";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), {
  ssr: false,
});

export default function Home() {
  useGsapScrollTrigger();

  return (
    <SmoothScroll>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
