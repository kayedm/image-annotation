import { User, Shirt, Box, Dog, MapPin, Landmark } from "lucide-react";

export const tools = [
    { label: "Person", icon: User },
    { label: "Clothing", icon: Shirt },
    { label: "Object", icon: Box },
    { label: "Animal", icon: Dog },
    { label: "Location", icon: MapPin },
    { label: "Landmark", icon: Landmark },
];

export function toolLookup(point) {
    const tool = tools.find(tool => tool.label === point.label)
    return tool;
}