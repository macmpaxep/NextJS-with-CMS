"use client";

import { useState } from "react";

export default function ProductImage({ slug, name, pixelPitch }: { slug: string; name: string; pixelPitch: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative aspect-[4/3] rounded-2xl bg-navy overflow-hidden scanline">
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/products/${slug}.webp`}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="pixel-grid w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-navy/10 via-transparent to-navy/70" />
        </div>
      )}
      <div className="absolute bottom-4 left-4 mono text-xs text-cyan bg-navy/70 rounded px-2.5 py-1.5">
        {pixelPitch}
      </div>
    </div>
  );
}
