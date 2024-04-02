export function objectEncode(object: Record<string, any>): string {
    return btoa(JSON.stringify(object));
}