export function toTurkishTitleCase(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return '';
      const lower = word.toLocaleLowerCase('tr-TR');
      const firstChar = lower.charAt(0).toLocaleUpperCase('tr-TR');
      const rest = lower.slice(1);
      return firstChar + rest;
    })
    .join(' ');
}

export function formatPhone(input: string): string {
  if (!input) return '';
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) {
    return `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  }
  return input;
}
