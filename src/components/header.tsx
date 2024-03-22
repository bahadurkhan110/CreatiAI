import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconcolor?: string;
  bgcolor?: string;
}

const Header = ({
  title,
  description,
  icon: Icon,
  iconcolor,
  bgcolor,
}: HeaderProps) => {
  return (
    <div className="px-4 flex item-center gap-x-3 lg:px-8">
      <div className={cn("p-2 w-fit rounded-md", bgcolor)}>
        <Icon className={cn("w-10 h-10 ", iconcolor)} />
      </div>
      <div>
        <h2 className="font-bold text-3xl">{title}</h2>
        <p className="text-sm text-muted-foreground ">{description}</p>
      </div>
    </div>
  );
};

export default Header;
