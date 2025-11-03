// Zoom with scroll wheel
export function handleWheel(e, setScale, offset, setOffset, containerRef) {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const delta = e.deltaY < 0 ? 1 + zoomSpeed : 1 - zoomSpeed;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    setScale(prevScale => {
        const newScale = Math.min(Math.max(prevScale * delta, 0.3), 5);
        const zoomFactor = newScale / prevScale;
        
        setOffset(prevOffset => ({
            x: cursorX - (cursorX - prevOffset.x) * zoomFactor,
            y: cursorY - (cursorY - prevOffset.y) * zoomFactor
        }));

        return newScale;
    });
}


// Start dragging
export function handleMouseDown(e, setDragging, wasDragging, startPos, offset) {
    e.preventDefault();
    setDragging(true);
    wasDragging.current = false;
    startPos.current = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
    };

    // Listen globally so drag ends even if cursor leaves the element
    window.addEventListener("mouseup", () => handleMouseUp(setDragging), { once: true });
}

// While dragging
export function handleMouseMove(e, dragging, wasDragging, setOffset, startPos) {
    if (!dragging) return;
    wasDragging.current = true;
    setOffset({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y
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
    // only re-enable scroll if not dragging
    document.body.style.overflow = "auto";
}
