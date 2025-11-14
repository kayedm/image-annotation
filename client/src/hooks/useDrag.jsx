import {useRef, useState} from "react";

export default function usePanZoom() {
    const [offset, setOffset] = useState({x: 0, y: 0});
    const [scale, setScale] = useState(null);
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
        console.log(offset);
    };

    const handleMouseUp = () => {
        wasDragging.current = false;
    };

    const handleMouseWheel = (e) => {
        const s = 0.1;

        e.deltaY < 0 ? setScale(prev => prev + s) : setScale(prev => Math.max(0, prev - s));

        console.log(scale);
    }

    const handlers = {
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseMove: handleMouseMove,
        onWheel: handleMouseWheel,
    };

    return {
        offset,
        setOffset,
        wasDragging,
        handlers,
        scale,
    }
}


