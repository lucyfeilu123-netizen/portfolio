"use client";

import { useRef, useCallback } from "react";
import { gallery } from "@/resources";
import styles from "./StickyGallery.module.scss";

export default function GalleryView() {
  const images = gallery.images;

  // Split images into 3 columns
  const leftImages = images.filter((_, i) => i % 3 === 0);
  const centerImages = images.filter((_, i) => i % 3 === 1);
  const rightImages = images.filter((_, i) => i % 3 === 2);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <div className={styles.gallery}>
      {/* Left column — scrolls */}
      <div className={styles.column}>
        {leftImages.map((image, index) => (
          <div
            key={`left-${index}`}
            className={`${styles.imageWrapper} ${styles.fadeIn}`}
            onMouseMove={handleMouseMove}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`${styles.image} ${styles.scrollImage}`}
              loading={index < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Center column — sticky */}
      <div className={styles.stickyColumn}>
        {centerImages.slice(0, 3).map((image, index) => {
          // Per-image focus: where the face/subject is
          const focusPositions = [
            "center 65%",  // Golden Gate close — your face is in lower portion
            "center 30%",  // Pink jacket — your face is in upper portion
            "center 55%",  // Gabri on bed — Gabri's face is in lower-center
          ];
          return (
            <div
              key={`center-${index}`}
              className={`${styles.stickyImageWrapper} ${styles.fadeIn}`}
              onMouseMove={handleMouseMove}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.stickyImage}
                style={{ objectPosition: focusPositions[index] }}
                loading="eager"
              />
            </div>
          );
        })}
      </div>

      {/* Right column — scrolls */}
      <div className={styles.column}>
        {rightImages.map((image, index) => (
          <div
            key={`right-${index}`}
            className={`${styles.imageWrapper} ${styles.fadeIn}`}
            onMouseMove={handleMouseMove}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`${styles.image} ${styles.scrollImage}`}
              loading={index < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
