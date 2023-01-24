// determine account type off role
export const roleMap = (role?: number) => {
  let r = ''

  if (!role) {
    r = 'Free'
  } else if (role <= 5) {
    r = `L${role}`
  } else {
    r = `H${role - 5}`
  }

  return r
}

// // determine usage max websites up to
// export const uptoLimitDisplay = (role?: number) => {
//   let r = ''

//   if (!role) {
//     r = 'Free'
//   } else if (role <= 5) {
//     r = `L${role}`
//   } else {
//     r = `H${role - 5}`
//   }

//   return r
// }
