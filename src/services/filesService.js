export const getProfileImagePath = (uid) => {
    return process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/uploads/${uid}/image`;
}

export const getSongPath = (id) => {
    return `${process.env.REACT_APP_KRONOS_API_BASE_URL}/api/uploads/songs/${id}`
}