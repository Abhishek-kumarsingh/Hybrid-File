import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  AlertTriangle,
  Activity,
  Server,
  BarChart,
  Search,
  Command as CommandIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

export const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search dashboard...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 shadow-lg">
          <CommandContainer className="rounded-lg border shadow-md">
            <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type a command or search..."
              />
            </div>
            <ul className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <li className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                Pages
              </li>
              {pages.map((page) => (
                <CommandItem
                  key={page.label}
                  onSelect={() => runCommand(() => navigate(page.path))}
                >
                  {page.icon}
                  <span>{page.label}</span>
                </CommandItem>
              ))}
              <li className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                Actions
              </li>
              {actions.map((action) => (
                <CommandItem
                  key={action.label}
                  onSelect={() => runCommand(action.action)}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </CommandItem>
              ))}
            </ul>
          </CommandContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface CommandItemProps extends React.HTMLAttributes<HTMLLIElement> {
  onSelect?: () => void;
}

const CommandItem = React.forwardRef<HTMLLIElement, CommandItemProps>(
  ({ className, onSelect, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        onClickCapture={() => onSelect?.()}
        {...props}
      >
        {children}
      </li>
    );
  }
);

CommandItem.displayName = "CommandItem";

const CommandContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
));

CommandContainer.displayName = "CommandContainer";

const pages = [
  {
    label: "Dashboard",
    path: "/",
    icon: <Activity className="mr-2 h-4 w-4" />,
  },
  {
    label: "Threats",
    path: "/threats",
    icon: <AlertTriangle className="mr-2 h-4 w-4" />,
  },
  {
    label: "Sensors",
    path: "/sensors",
    icon: <Server className="mr-2 h-4 w-4" />,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: <BarChart className="mr-2 h-4 w-4" />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

const actions = [
  {
    label: "View Profile",
    icon: <User className="mr-2 h-4 w-4" />,
    action: () => console.log("View Profile"),
  },
  {
    label: "Toggle Dark Mode",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
    action: () => console.log("Toggle Dark Mode"),
  },
  {
    label: "View Calendar",
    icon: <Calendar className="mr-2 h-4 w-4" />,
    action: () => console.log("View Calendar"),
  },
  {
    label: "View Calculator",
    icon: <Calculator className="mr-2 h-4 w-4" />,
    action: () => console.log("View Calculator"),
  },
];
