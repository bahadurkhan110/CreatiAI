"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  CodeIcon,
  Music2Icon,
  Video,
  ImageIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
const tools = [
  {
    label: "Message",
    icon: MessageSquare,
    href: "/message",
    color: "text-red-700",

    bgcolor: "bg-red-500/10",
  },

  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-emerald-700",
    bgcolor: "bg-emerald-500/10",
  },

  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-purple-500",
    bgcolor: "bg-purple-500/10",
  },

  {
    label: "Video Generation",
    icon: Video,
    href: "/video",
    color: "text-yellow-800",
    bgcolor: "bg-yellow-500/10",
  },

  {
    label: "Music Generation",
    icon: Music2Icon,
    href: "/music",
    color: "text-pink-700",
    bgcolor: "bg-pink-500/10",
  },
];

const DashBoardPage = () => {
  const router = useRouter();
  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Create with the Power of AI
      </h2>
      <p className="text-muted-foreground font-light text-2xl md:text-3xl text-center">
        Anything you Imagine can be created by CREATIAI
      </p>

      <div className="pl-10 space-y-4 pr-10">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/3 flex item-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="pl-4">{tool.label}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashBoardPage;
