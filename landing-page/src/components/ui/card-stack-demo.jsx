import { CardStack } from "./card-stack";
import { cn } from "../../lib/utils";

export function CardStackDemo() {
  return (
    <div className="h-[800px] flex items-center justify-center w-full overflow-hidden">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Sarah Chen",
    designation: "Product Designer at Figma",
    illustration: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <p>
        Noa has completely transformed how our design team collaborates. <Highlight>No more endless Slack threads</Highlight> trying to explain which button needs to be moved. We just pin comments directly on the live site and everyone knows exactly what needs to be done.
      </p>
    ),
  },
  {
    id: 1,
    name: "Marcus Rodriguez",
    designation: "Frontend Developer at Stripe",
    illustration: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <p>
        Finally, a tool that <Highlight>eliminates the guesswork</Highlight> in feedback. Instead of "make the header bigger," I get precise annotations showing exactly where and how much. <Highlight>Our development cycles are 40% faster</Highlight> now.
      </p>
    ),
  },
  {
    id: 2,
    name: "Emily Thompson",
    designation: "Head of Design at Shopify",
    illustration: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <p>
        The <Highlight>contextual feedback</Highlight> is a game-changer. Our clients can point to exactly what they want changed, and our team can see it in real-time. <Highlight>Zero miscommunication,</Highlight> maximum productivity.
      </p>
    ),
  },
];
