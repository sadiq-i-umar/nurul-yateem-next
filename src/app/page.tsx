"use client";
import HeroSection from "@/components/website/(pages)/home/hero";
import WebsiteNav from "@/components/website/(pages)/home/nav";

export default function Home() {
  return (
    <div className="mx-10">
      <WebsiteNav />
      <HeroSection />
    </div>
  );
}
