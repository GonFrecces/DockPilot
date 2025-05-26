const languajes = [
    {
        "name": "JavaScript",
        "type": "frontend",
        "frameworks": ["React", "Vue", "Angular", "Svelte"]
    },
    {
        "name": "Python",
        "type": "backend",
        "frameworks": ["Django", "Flask", "FastAPI"]
    }
]

export const getLanguages = () => {
    return languajes;
}