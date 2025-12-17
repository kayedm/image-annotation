import {getLocalCoords} from "../utils/coords.js";

export default function useCrop({didDrag, isCropping, setCropPoints, setIsCropping}) {

    function handleMouseDown(e) {
        const cropPoint = getLocalCoords(e)
        if (didDrag.current) return;
        if (!isCropping) {
            setCropPoints([cropPoint]);
            setIsCropping(true)
        }
        if (isCropping) {
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