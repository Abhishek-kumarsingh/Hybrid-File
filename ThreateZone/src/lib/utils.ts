import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number with commas for thousands
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 */
export function truncateString(str: string, num: number): string {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Gets a color based on status
 */
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    critical: 'danger',
    high: 'danger',
    medium: 'warning',
    low: 'warning',
    resolved: 'success',
    normal: 'success',
    warning: 'warning',
    error: 'danger',
    success: 'success',
    info: 'primary',
  };
  
  return statusMap[status.toLowerCase()] || 'primary';
}

/**
 * Formats a severity level to a more readable form
 */
export function formatSeverity(severity: string): string {
  const map: Record<string, string> = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };
  
  return map[severity.toLowerCase()] || severity;
}

/**
 * Formats a status to a more readable form
 */
export function formatStatus(status: string): string {
  const map: Record<string, string> = {
    active: 'Active',
    resolved: 'Resolved',
    investigating: 'Investigating',
    mitigated: 'Mitigated',
    normal: 'Normal',
    warning: 'Warning',
    critical: 'Critical',
  };
  
  return map[status.toLowerCase()] || status;
}
