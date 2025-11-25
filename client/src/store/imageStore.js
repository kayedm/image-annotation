import {create} from 'zustand';

export const imageStore = create((set, get) => ({

    image: null,
    annotations: [],
    hidePoints: false,
    selectedTool: null,

    addAnnotation: point => set(state => {
        const newId = state.annotations.length + 1;
        return {
            annotations: [...state.annotations, {
                id: newId, title: "",
                label: point.label,
                referenceImages: [],
                point: {x: point.x, y: point.y},
            }]
        };
    }),

    deleteAnnotation: id => set(state => ({
        annotations: state.annotations.filter(annotation => annotation.id !== id)
    })),

    updateAnnotationTitle: (id, title) => set(state => ({
        annotations: state.annotations.map(ann => ann.id === id ? {
            ...ann, title: title
        } : ann)
    })),

    addAnnotationRefImage: (id, image) => set(state => ({
        annotations: state.annotations.map(ann => ann.id === id ? {
            ...ann, referenceImages: [...ann.referenceImages, {
                id: ann.referenceImages.length + 1, src: image
            }]
        } : ann)
    })),

    updateAnnotationRefImage: (annId, imageId, newImage) => set(state => ({
        annotations: state.annotations.map(ann => ann.id === annId ? {
            ...ann, referenceImages: ann.referenceImages.map(img => img.id === imageId ? {...img, src: newImage}
                : img)
        } : ann)
    })),

    deleteAnnotationRefImage: (id, imageId) => set(state => ({
        annotations: state.annotations.map(ann => ann.id === id ? {
            ...ann, referenceImages: ann.referenceImages.filter(img => img.id !== imageId)
        } : ann)
    })),

    setImage: (img) => set({image: img}),
    setSelectedTool: (tool) => set((state) => ({selectedTool: state.selectedTool === tool ? null : tool})),
    toggleHidePoints: () => set((state) => ({hidePoints: !state.hidePoints})),

    buildPayload: () => {
        const state = get();
        return {
            image: state.image, referenceImages: state.referenceImages, points: state.points
        };
    }
}));
