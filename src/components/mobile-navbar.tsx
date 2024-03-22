"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "@/components/sidebar";
import { useEffect, useState } from "react";

const MobileNavbar = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-blue-300">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
