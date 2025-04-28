// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flattenObject(obj: Record<string, any>): Record<string, any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: Record<string, any> = {};
    if(obj){
        for (const [key, value] of Object.entries(obj)) {
            result[key] = Array.isArray(value) ? value[0] : value;
        }
    }
    return result;
}