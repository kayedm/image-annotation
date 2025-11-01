// Zoom with scroll wheel
export function handleWheel(e, setScale) {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
    setScale(prev => Math.min(Math.max(prev + delta, 0.3), 5));
}

// Start dragging
export function handleMouseDown(e, setDragging, wasDragging, startPos, offset) {
    e.preventDefault();
    setDragging(true);
    wasDragging.current = false;
    startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
}

// While dragging
export function handleMouseMove(e, dragging, wasDragging, setOffset, startPos) {
    if (!dragging) return;
    wasDragging.current = true;
    setOffset({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
    });
}

// Stop dragging
export function handleMouseUp(setDragging) {
    setDragging(false);
}

// Disable page scroll when mouse enters preview
export function handleMouseEnter() {
    document.body.style.overflow = "hidden";
}

// Re-enable scroll when mouse leaves preview
export function handleMouseLeave() {
    document.body.style.overflow = "auto";
}
