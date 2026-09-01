import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  type Transition,
} from "framer-motion";

/* ─── Section Reveal ─── */
interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Text Reveal (line by line) ─── */
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({ text, className = "", delay = 0, tag = "p" }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const words = text.split(" ");

  return (
    <motion.div ref={ref} className={className} aria-label={text}>
      {tag !== "p" ? (
        // For headings, animate the whole text
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {(() => {
            const Tag = tag;
            return <Tag>{text}</Tag>;
          })()}
        </motion.div>
      ) : (
        <span className="inline">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: delay + i * 0.04,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      )}
    </motion.div>
  );
}

/* ─── Stagger Children ─── */
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function Stagger({ children, className = "", staggerDelay = 0.1, initialDelay = 0 }: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>
      }
    </motion.div>
  );
}

/* ─── Fade In Up ─── */
interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeInUp({ children, className = "", delay = 0, duration = 0.7 }: FadeInUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scale In ─── */
interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleIn({ children, className = "", delay = 0 }: ScaleInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Line Divider ─── */
interface LineDividerProps {
  className?: string;
}

export function AnimatedLineDivider({ className = "" }: LineDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className={`relative h-px w-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-y-0 left-0 h-full bg-gradient-to-r from-transparent via-cyan/40 to-transparent"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
      />
      <div className="h-full w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
