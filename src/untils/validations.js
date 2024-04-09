//validate username
export const isValidUsername = (stringUsername) => stringUsername.length >= 5

//validate fullname
export const isValidFullname = (stringFullname) => stringFullname != ''

//validate password
export const isValidPassword = (stringPassword) => stringPassword.length >= 5

//validate email
export const isValidEmail = (stringEmail) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))
}

