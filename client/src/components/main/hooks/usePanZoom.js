import { useRef, useState } from "react";

export default function usePanZoom({ minScale = 0.3, maxScale = 5, zoomSpeed = 0.1 } = {}) {
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const wasDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const lastTouchDistance = useRef(null);

    const handleWheel = (e) => {
        e.preventDefault();
        if (!containerRef.current || !imgRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;
        const delta = e.deltaY < 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
        setScale((prevScale) => {
            const newScale = clampScale(prevScale * delta, minScale, maxScale);
            const zoomFactor = newScale / prevScale;
            const newOffset = {
                x: cursorX - (cursorX - offset.x) * zoomFactor,
                y: cursorY - (cursorY - offset.y) * zoomFactor,
            };
            setOffset(clampOffset(newOffset, newScale, containerRef, imgRef));
            return newScale;
        });
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setDragging(true);
        wasDragging.current = false;
        startPos.current = {
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        };
        window.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        wasDragging.current = true;
        const newOffset = {
            x: e.clientX - startPos.current.x,
            y: e.clientY - startPos.current.y,
        };
        setOffset(clampOffset(newOffset, scale, containerRef, imgRef));
    };

    const handleMouseUp = () => setDragging(false);

    const handleTouchStart = (e) => {
        if (e.touches.length === 1) {
            setDragging(true);
            startPos.current = {
                x: e.touches[0].clientX - offset.x,
                y: e.touches[0].clientY - offset.y,
            };
        } else if (e.touches.length === 2) {
            lastTouchDistance.current = getTouchDistance(e.touches);
        }
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (e.touches.length === 1 && dragging) {
            wasDragging.current = true;
            const newOffset = {
                x: e.touches[0].clientX - startPos.current.x,
                y: e.touches[0].clientY - startPos.current.y,
            };
            setOffset(clampOffset(newOffset, scale, containerRef, imgRef));
        } else if (e.touches.length === 2) {
            const newDistance = getTouchDistance(e.touches);
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
            const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
            setScale((prevScale) => {
                const factor = newDistance / (lastTouchDistance.current || newDistance);
                const newScale = clampScale(prevScale * factor, minScale, maxScale);
                const zoomFactor = newScale / prevScale;
                const newOffset = {
                    x: centerX - (centerX - offset.x) * zoomFactor,
                    y: centerY - (centerY - offset.y) * zoomFactor,
                };
                setOffset(clampOffset(newOffset, newScale, containerRef, imgRef));
                lastTouchDistance.current = newDistance;
                return newScale;
            });
        }
    };

    const handleTouchEnd = (e) => {
        if (e.touches.length < 2) lastTouchDistance.current = null;
        if (e.touches.length === 0) setDragging(false);
    };

    const handleMouseEnter = () => (document.body.style.overflow = "hidden");
    const handleMouseLeave = () => (document.body.style.overflow = "auto");

    const handlers = {
        onWheel: handleWheel,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
    };

    return { scale, offset, containerRef, imgRef, dragging, handlers, wasDragging };
}

function clampScale(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function clampOffset(offset, scale, containerRef, imgRef) {
    if (!containerRef.current || !imgRef.current) return offset;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cw = containerRect.width;
    const ch = containerRect.height;
    const iw = imgRef.current.naturalWidth;
    const ih = imgRef.current.naturalHeight;
    const sw = iw * scale;
    const sh = ih * scale;
    const padding = 400;
    const minX = Math.min(cw - sw - padding, padding);
    const minY = Math.min(ch - sh - padding, padding);
    const maxX = padding;

    return {
        x: Math.min(Math.max(offset.x, minX), maxX),
        y: Math.min(Math.max(offset.y, minY), padding),
    };
}

function getTouchDistance(touches) {
    const [t1, t2] = touches;
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}
