"use client";

import { forwardRef } from "react";

type WhyJoinNibbleCardProps = {
  title: string;
  description: string;
  index: number;
};

const WhyJoinNibbleCard = forwardRef<HTMLDivElement, WhyJoinNibbleCardProps>(
  ({ title, description, index }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{
          zIndex: index + 1,
          transform: "translateY(120%)",
        }}
      >
        <div
          className="
            w-full
            max-w-3xl
            h-[420px]
            rounded-3xl
            bg-gradient-to-br from-white/[0.08] to-white/[0.02]
            backdrop-blur-xl
            border border-white/[0.08]
            shadow-[0_30px_120px_rgba(0,0,0,0.6)]
            p-12
            flex
            flex-col
            justify-center
          "
        >
          <h3 className="text-4xl font-semibold text-white mb-6">
            {title}
          </h3>

          <p className="text-white/60 text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  }
);

WhyJoinNibbleCard.displayName = "WhyJoinNibbleCard";

export default WhyJoinNibbleCard;
