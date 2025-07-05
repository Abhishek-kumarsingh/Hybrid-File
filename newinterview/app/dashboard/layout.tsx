"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoutButton } from "@/components/logout-button";
import { ProfileDropdown } from "@/components/profile-dropdown";
import {
  BarChart3,
  Calendar,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Menu,
  Sparkles,
  Brain,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Get sidebar state from localStorage on component mount
  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("sidebarCollapsed", String(sidebarCollapsed));
    }
  }, [sidebarCollapsed, isMounted]);

  // Base navigation items
  const baseNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Interviews", href: "/dashboard/interviews", icon: MessageSquare },
    { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: Sparkles },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Add admin link if user has admin role
  const navigation =
    session?.user?.role === "admin"
      ? [
          ...baseNavigation,
          { name: "Admin", href: "/dashboard/admin", icon: Shield },
        ]
      : baseNavigation;

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-card transition-all duration-200 ease-in-out relative z-30",
          sidebarCollapsed ? "w-[70px]" : "w-64"
        )}
      >
        {/* No header space needed */}

        <TooltipProvider delayDuration={0}>
          <nav
            className={cn(
              "flex-1 p-2 space-y-1 overflow-y-auto",
              sidebarCollapsed ? "items-center" : ""
            )}
          >
            {navigation.map((item) =>
              sidebarCollapsed ? (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-md transition-colors",
                        pathname === item.href ||
                          pathname?.startsWith(item.href + "/")
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.name}</TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href ||
                      pathname?.startsWith(item.href + "/")
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              )
            )}
          </nav>
        </TooltipProvider>

        {/* Sidebar footer - removed profile and logout */}
      </aside>

      {/* Mobile Header & Sidebar */}
      <Sheet>
        <div className="sticky top-0 z-30 flex items-center justify-between md:hidden p-4 border-b bg-card/80 backdrop-blur-sm">
          <Link
            href="/dashboard"
            className="font-semibold flex items-center gap-2"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            InterviewAI
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <ProfileDropdown />
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </div>
        </div>

        <SheetContent side="left" className="p-0">
          <div className="p-6 border-b">
            <h2 className="font-semibold text-lg">Menu</h2>
          </div>

          <nav className="flex flex-col p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href ||
                    pathname?.startsWith(item.href + "/")
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}

            {/* Removed logout button */}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Header moved to main content area */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header (always visible) */}
        <div className="hidden md:flex sticky top-0 z-20 items-center h-16 px-4 border-b bg-card/80 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg truncate max-w-[calc(100%-8rem)]">
            {navigation.find(
              (item) =>
                pathname === item.href || pathname?.startsWith(item.href + "/")
            )?.name || "Dashboard"}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
            <ProfileDropdown />
          </div>
        </div>

        <main className="flex-1 overflow-auto">
          <div className="min-h-screen">{children}</div>
        </main>
      </div>
    </div>
  );
}
