"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useIsMounted } from "../hooks/useIsMounted";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  // Determine if the current theme is dark
  const isDark = theme === "dark";

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div
      className={`w-full px-6 py-2 flex justify-between items-center border-b transition-colors duration-300 ${
        isDark
          ? "bg-gray-800 border-b-gray-700 text-white"
          : "bg-green-500 border-b-green-700 text-black"
      }`}
    >
      <div className="hidden md:flex gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/categories" className="hover:underline">
          Categories
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/profile" className="hover:underline">
          Profile
        </Link>
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:underline">
            Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/categories">Categories</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/about">About</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4">
        <Switch
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="hover:underline"
        />
  <p>{isDark ? "Light Mode" : "Dark Mode"}</p>
        <ConnectButton />
      </div>
    </div>
  );
}
