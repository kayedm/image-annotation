import {useRef, useState} from "react";

export default function usePanZoom() {
    const [offset, setOffset] = useState({x: 0, y: 0});
    const startPos = useRef({x: 0, y: 0});
    const wasDragging = useRef(false);

    const handleMouseDown = (e) => {
        wasDragging.current = true;
        startPos.current = {
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        };
    };

    const handleMouseMove = (e) => {
        if (!wasDragging.current) return;
        setOffset({
            x: e.clientX - startPos.current.x,
            y: e.clientY - startPos.current.y
        });
    };

    const handleMouseUp = () => {
        wasDragging.current = false;
    };

    const handlers = {
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseMove: handleMouseMove,
    };

    return {
        offset,
        setOffset,
        wasDragging,
        handlers,
    }
}


