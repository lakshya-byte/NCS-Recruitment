"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyJoinNibbleCard from "@/components/why-join-nibble/WhyJoinNibbleCard";

gsap.registerPlugin(ScrollTrigger);

const CARD_DATA = [
  {
    title: "Build Real Systems",
    description: "Work on real production-grade platforms.",
  },
  {
    title: "Elite Engineering Culture",
    description: "Collaborate with serious engineers.",
  },
  {
    title: "Ship Cinematic Interfaces",
    description: "Create Awwwards-level web experiences.",
  },
  {
    title: "Accelerate Your Growth",
    description: "Become industry ready.",
  },
];

export default function WhyJoinNibble() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  cardsRef.current = [];

  const setCardRef = (el: HTMLDivElement | null) => {
    if (el) cardsRef.current.push(el);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const cards = cardsRef.current;

    if (!section || !pin || cards.length === 0) return;

    const scrollDistance = window.innerHeight * (cards.length - 1);

    // CRITICAL: set section height equal to scroll distance
    gsap.set(section, {
      height: window.innerHeight + scrollDistance,
    });

    gsap.set(cards, {
      yPercent: 120,
      scale: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: true,
        pin: pin,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    cards.forEach((card, index) => {
      tl.to(
        card,
        {
          yPercent: 0,
          ease: "none",
        },
        index
      );

      if (index > 0) {
        tl.to(
          cards.slice(0, index),
          {
            scale: 0.92 - index * 0.03,
            ease: "none",
          },
          index
        );
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
    >
      {/* sticky pin container */}
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-4xl h-[500px]">
          {CARD_DATA.map((card, index) => (
            <WhyJoinNibbleCard
              key={index}
              ref={setCardRef}
              index={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
