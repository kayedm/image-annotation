import {useRef, useState} from "react";
import { getParentCoords } from "../utils/coords.js";

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

        const coords = getParentCoords(e);

        const imgX = (coords.x - offset.x) / scale;
        const imgY = (coords.y - offset.y) / scale;

        const newScale = e.deltaY < 0 ? scale + zoomStep : Math.max(0.5, scale - zoomStep);

        const newOffset = {
            x: coords.x - imgX * newScale,
            y: coords.y - imgY * newScale,
        }

        setScale(newScale);
        setOffset(newOffset);

    };

    return {
        offset,
        didDrag,
        scale,
        handlers: {
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onWheel: handleMouseWheel,
        },
    }
}


