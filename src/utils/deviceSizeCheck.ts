export type DeviceSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export function deviceSizeCheck(size: DeviceSizeType) {
    const devices: Record<string, number> = {
        'sm': 640,
        'md': 768,
        'lg': 1024,
        'xl': 1280,
        '2xl': 1536,
    }

    if (size === 'xs') {
        return window.innerWidth < devices.sm;
    }

    const devicesKeys = Object.keys(devices);
    const devicesVals = Object.values(devices);

    const currentIdx = devicesKeys.indexOf(size);

    return window.innerWidth >= devicesVals[currentIdx] &&
        window.innerWidth < devicesVals[currentIdx + 1];
}