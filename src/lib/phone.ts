export function viberHref(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `38${digits}`;
  return `viber://chat?number=%2B${digits}`;
}
