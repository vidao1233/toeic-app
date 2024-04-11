//validate username
export const isValidUsername = (stringUsername) => stringUsername.length >= 5

//validate fullname
export const isValidFullname = (stringFullname) => stringFullname != ''

//validate password
export const isValidPassword = (stringPassword) => stringPassword.length >= 5

//validate email
export const isValidEmail = (stringEmail) => {
    const emailRegex = /^(?=.{6,80}$)([A-Za-z0-9_\-]+[.]?)*[A-Za-z0-9_\-]+@([A-Za-z0-9_\-]+)\.([A-Za-z0-9_\-]+[.]?)*([A-Za-z0-9_\-]*[A-Za-z][A-Za-z])$/i;
    return emailRegex.test(stringEmail);
}


