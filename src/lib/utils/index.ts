export function camel2Title(camelText: string): string {
    const separated = camelText.replace(/([A-Z])/g, " $1");
    return separated.charAt(0).toUpperCase() + separated.slice(1);
}