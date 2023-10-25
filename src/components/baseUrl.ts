interface Sizes {
    [index: string]: string
}

const sizes: Sizes = {
    small: "w342",
    medium: 'w500',
    large: "w780",
    org: "original",
}

export default (path: string, size: string = 'medium') => {
    return `http://image.tmdb.org/t/p/${sizes[size]}/${path}`
}