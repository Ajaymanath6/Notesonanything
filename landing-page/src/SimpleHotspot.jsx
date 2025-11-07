import { motion } from "framer-motion";

// Simple Hotspot Component with CTA color - same size as floating button
const SimpleHotspot = ({ position, visible }) => {
  if (!visible || !position) return null;

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {/* Simple pulsing ring - same size as floating button (w-14 h-14 = 56px) */}
      <motion.div
        className="w-14 h-14 rounded-full absolute"
        style={{
          border: "3px solid rgb(16, 185, 129)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.2, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default SimpleHotspot;

