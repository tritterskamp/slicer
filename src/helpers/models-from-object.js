export function modelsFromObject(structure={}) {
    return Object.keys(structure).map(function(id) {
        return {
            _id: id,
            ...structure[id]
        }
    });
}