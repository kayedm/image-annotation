export async function getAnnotations() {
    try {
        const res = await fetch("http://localhost:5000/annotations", {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            return console.error("Error retrieving annotations");
        }

    } catch(e) {
        console.error(e);
    }
}

export async function saveAnnotation(annotation) {
    try {
        const res = await fetch("http://localhost:5000/annotations", {
            method: "POST",
            credentials: "include",
            header: {"Content-Type:" : "application/json"},
            body: JSON.Stringify(annotation),
        });

        if(!res.ok) {
            return false;
        }

    } catch (e) {
        console.error(e);
    }
}

export async function deleteAnnotation(annotation) {
    try {
        const res = await fetch(`http://localhost:5000/annotations/${annotation.id}`, {
            method: "DELETE",
            credentials: "include",
        })

        if(!res.ok) {
            return false;
        }

    } catch (e) {
        console.error(e);
    }


}