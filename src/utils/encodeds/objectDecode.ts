export function objectDecode<T>(encoded: string): T {
    return JSON.parse(atob(encoded)) as T;
}