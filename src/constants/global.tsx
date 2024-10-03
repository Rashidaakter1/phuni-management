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