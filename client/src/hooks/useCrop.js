import {getLocalCoords} from "../utils/coords.js";

export default function useCrop({didDrag, isCropping, setCropPoints, setIsCropping}) {

    function handleMouseDown(e) {
        if (didDrag.current) return;
        const cropPoint = getLocalCoords(e)
        if (!isCropping) {
            setCropPoints([cropPoint]);
            setIsCropping(true)
        } else {
            setCropPoints(prev => [prev[0], cropPoint]);
            setIsCropping(false)
        }
    }

    function handleMouseMove(e) {
        if (!isCropping) return;
        const cropPoint = getLocalCoords(e)
        setCropPoints(prev => [prev[0], cropPoint]);
    }

    return {
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
    }
}