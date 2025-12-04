export function getLocalCoords(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
    };
}

export function getParentCoords(e) {
    const container = e.currentTarget.parentElement;
    const rect = container.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left),
        y: (e.clientY - rect.top)
    };
}
