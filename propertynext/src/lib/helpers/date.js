/**
 * Formats a date object or string into a more readable format.
 * @param {Date | string | number} dateInput - The date to format.
 * @param {Intl.DateTimeFormatOptions} options - Formatting options.
 * @returns {string} The formatted date string.
 */
export function formatDate(
    dateInput,
    options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
) {
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return new Intl.DateTimeFormat('en-US', options).format(date);
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
}

/**
 * Formats a date to include time.
 * @param {Date | string | number} dateInput - The date to format.
 * @returns {string} The formatted date-time string.
 */
export function formatDateTime(dateInput) {
    return formatDate(dateInput, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

/**
 * Calculates the difference between two dates in a specified unit.
 * @param {Date | string | number} date1
 * @param {Date | string | number} date2
 * @param {'days' | 'hours' | 'minutes' | 'seconds'} unit
 * @returns {number} The difference in the specified unit.
 */
export function dateDiff(date1, date2, unit = 'days') {
    const d1 = new Date(date1).getTime();
    const d2 = new Date(date2).getTime();
    if (isNaN(d1) || isNaN(d2)) return NaN;

    let diff = Math.abs(d1 - d2); // Difference in milliseconds

    switch (unit) {
        case 'seconds':
            return Math.floor(diff / 1000);
        case 'minutes':
            return Math.floor(diff / (1000 * 60));
        case 'hours':
            return Math.floor(diff / (1000 * 60 * 60));
        case 'days':
        default:
            return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
}