import {useRef, useState} from "react";

export default function usePanZoom() {
    const [offset, setOffset] = useState({x: 0, y: 0});
    const [scale, setScale] = useState(1);
    const startPos = useRef({x: 0, y: 0});
    const isDown = useRef(false);
    const didDrag = useRef(false);

    const handleMouseDown = (e) => {
        isDown.current = true;
        didDrag.current = false;
        startPos.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            startX: offset.x,
            startY: offset.y
        };
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;

        const threshold = 5;

        const dx = e.clientX - startPos.current.mouseX;
        const dy = e.clientY - startPos.current.mouseY;

        if ( Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

        didDrag.current = true;

        setOffset({
            x: startPos.current.startX + dx,
            y: startPos.current.startY + dy
        });
    };

    const handleMouseUp = () => {
        isDown.current = false;
    };

    const handleMouseWheel = (e) => {
        e.preventDefault();
        const zoomStep = 0.1;
        const rect = e.target.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const imgX = (mouseX - offset.x) / scale;
        const imgY = (mouseY - offset.y) / scale;
        const newScale = e.deltaY < 0 ? scale + zoomStep : Math.max(0.6, scale - zoomStep);
        const newOffset = {
            x: mouseX - imgX * newScale,
            y: mouseY - imgY * newScale,
        }
        setScale(newScale);
        setOffset(newOffset);
    };

    const handlers = {
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseMove: handleMouseMove,
        onWheel: handleMouseWheel,
    };

    return {
        offset,
        setOffset,
        isDown,
        didDrag,
        handlers,
        scale,
    }
}


