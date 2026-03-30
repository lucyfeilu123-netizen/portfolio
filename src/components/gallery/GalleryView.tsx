"use client";

import { Media } from "@once-ui-system/core";
import { gallery } from "@/resources";
import styles from "./StickyGallery.module.scss";

export default function GalleryView() {
  const images = gallery.images;

  // Split images into 3 columns: left scrolling, center sticky, right scrolling
  const leftImages = images.filter((_, i) => i % 3 === 0);
  const centerImages = images.filter((_, i) => i % 3 === 1);
  const rightImages = images.filter((_, i) => i % 3 === 2);

  return (
    <div className={styles.gallery}>
      {/* Left column — scrolls */}
      <div className={styles.column}>
        {leftImages.map((image, index) => (
          <figure key={`left-${index}`}>
            <Media
              enlarge
              radius="m"
              sizes="(max-width: 768px) 50vw, 33vw"
              src={image.src}
              alt={image.alt}
              aspectRatio="3 / 4"
            />
          </figure>
        ))}
      </div>

      {/* Center column — sticky */}
      <div className={styles.stickyColumn}>
        {centerImages.slice(0, 3).map((image, index) => (
          <figure key={`center-${index}`} style={{ overflow: "hidden", borderRadius: "var(--radius-m)" }}>
            <Media
              enlarge
              radius="m"
              sizes="(max-width: 768px) 50vw, 33vw"
              src={image.src}
              alt={image.alt}
            />
          </figure>
        ))}
      </div>

      {/* Right column — scrolls */}
      <div className={styles.column}>
        {rightImages.map((image, index) => (
          <figure key={`right-${index}`}>
            <Media
              enlarge
              radius="m"
              sizes="(max-width: 768px) 50vw, 33vw"
              src={image.src}
              alt={image.alt}
              aspectRatio="3 / 4"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
