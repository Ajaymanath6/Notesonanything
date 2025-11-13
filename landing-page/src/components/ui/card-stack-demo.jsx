import { motion } from "framer-motion";
import { MapPin, Target, ChatCircleDots, Lightning } from "phosphor-react";

export function CardStackDemo() {
  const features = [
    {
      Icon: MapPin,
      text: "Pin comments directly on live sites—no more endless Slack threads explaining which button needs to be moved"
    },
    {
      Icon: Target,
      text: "Get precise annotations showing exactly where and how much—eliminate guesswork in feedback"
    },
    {
      Icon: ChatCircleDots,
      text: "Contextual feedback that your team sees in real-time—zero miscommunication, maximum productivity"
    },
    {
      Icon: Lightning,
      text: "Accelerate development cycles with clear, actionable feedback that everyone understands instantly"
    }
  ];

  return (
    <div className="h-[800px] flex items-center justify-center w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6 w-full"
      >
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative rounded-xl overflow-hidden cursor-pointer"
              style={{
                backgroundColor: "#FFFFFF",
                padding: "4px",
                minHeight: "280px",
              }}
            >
              {/* Gradient layer */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "linear-gradient(96.12deg, #F5F5F5 29.3%, #E2F3E0 74.68%)",
                  borderTop: "1.5px solid #FFFFFF",
                  borderLeft: "1.5px solid #FFFFFF",
                  borderRight: "none",
                  borderBottom: "none",
                  top: "4px",
                  left: "4px",
                  right: "4px",
                  bottom: "4px",
                }}
                whileHover={{
                  background: "linear-gradient(96.12deg, #F0F0F0 29.3%, #D4E8D1 74.68%)",
                  transition: { duration: 0.2 }
                }}
              />
              
              {/* Content layer */}
              <div className="relative flex flex-col items-start gap-4 p-6 h-full">
                <div className="flex-shrink-0" style={{ color: "#16a34a" }}>
                  <feature.Icon size={32} weight="duotone" />
                </div>
                <p
                  className="text-xl md:text-2xl font-normal leading-relaxed flex-1"
                  style={{
                    fontFamily: "Lato, sans-serif",
                    color: "#111827",
                    lineHeight: "1.5",
                  }}
                >
                  <span className="font-bold" style={{ color: "#16a34a" }}>NOA</span>{" "}
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
