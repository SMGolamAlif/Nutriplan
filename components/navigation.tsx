"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            NutriPlan
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/meal-plans"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/meal-plans"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Meal Plans
            </Link>
            <Link
              href="/preferences"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/preferences"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Preferences
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
