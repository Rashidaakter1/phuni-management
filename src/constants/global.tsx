export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export const weekNames = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const weekOptions = weekNames.map(name => ({
    value: name,
    label: name
}))
export const monthOptions = monthNames.map(name => ({
    value: name,
    label: name
}))



export const gender = ["male", "female", "other"]
export const genderOptions = gender.map(item => ({
    label: item.charAt(0).toUpperCase() + item.slice(1),
    value: item
}))
export const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
export const bloodGroupOptions = bloodGroup.map(item => ({
    label: item,
    value: item
}))