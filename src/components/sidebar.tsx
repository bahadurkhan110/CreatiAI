"use client";

import {
  Code,
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Message",
    icon: MessageSquare,
    href: "/message",
    color: "text-red-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-yellow-500",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-purple-500",
  },

  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-green-500",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-pink-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 flex flex-col h-full bg-blue text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard">
          <div className="relative w-8 h-8 mr-4 mt-5">
            <Image fill alt="logo" src="/logo.svg" />
            <h2 className="text-2xl font-bold ml-20 ">CreatiAI</h2>
          </div>
        </Link>
        <div className="space-y-1 mt-4">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex w-full p-5 cursor-pointer transition rounded-lg justify-start font-bold font-medium hover:text-white hover:bg-white/10 ",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex item-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
