import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BounceGallery({
  className = "",
  images = [],
  containerWidth = 600,
  containerHeight = 300,
  transformStyles = [],
  animationDelay = 0.3, // Réduit de 0.8 à 0.3
  animationStagger = 0.04, // Réduit de 0.06 à 0.04
  easeType = "power2.out", // Changé de elastic.out à power2.out (plus performant)
  enableHover = true,
}) {
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Animation une seule fois au montage
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      gsap.fromTo(
        ".bounce-card",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
          force3D: true, // Force GPU acceleration
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dépendances vides pour n'animer qu'une fois

  // Fonction pour obtenir la transformation sans rotation
  const getNoRotationTransform = (transformStr) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    } else if (transformStr === "none") {
      return "rotate(0deg)";
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  // Fonction pour obtenir la transformation poussée
  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === "none"
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        // Carte survolée : enlever la rotation
        const noRotation = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        // Cartes voisines : pousser sur les côtés
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: "back.out(1.4)",
          delay,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || "none";
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`bounce-card card-${idx} absolute w-[200px] aspect-square border-8 border-white rounded-[30px] overflow-hidden cursor-pointer`}
          style={{
            boxShadow: "0 0 40px rgba(229, 9, 20, 0.5)",
            transform: transformStyles[idx] || "none",
            zIndex: 100 - idx,
            willChange: "transform", // Optimisation GPU
            backfaceVisibility: "hidden", // Évite le flickering
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img
            className="w-full h-full object-cover"
            src={src}
            alt={`card-${idx}`}
            loading="lazy" // Lazy loading
            decoding="async" // Décodage asynchrone
          />
        </div>
      ))}
    </div>
  );
}
