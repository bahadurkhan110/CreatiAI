import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import MobileNavbar from "@/components/mobile-navbar";

const NavBar = () => {
  return (
    <div className="flex items-center p-5">
      <MobileNavbar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavBar;
