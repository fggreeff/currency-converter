const users = [
  {
    id: 1,
    name: 'andres',
    schoolId: 111
  },
  {
    id: 2,
    name: 'jess',
    schoolId: 999
  }
]

const grades = [
  {
    id: 1,
    schoolId: 111,
    grade: 86
  },
  {
    id: 2,
    schoolId: 999,
    grade: 100
  },
  {
    id: 3,
    schoolId: 111,
    grade: 80
  }
]

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id)

    if (user) {
      resolve(user)
    } else {
      reject(`unable to find user with id of ${id}`)
    }
  })
}

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    const myGrades = grades.filter(grade => grade.schoolId === schoolId)

    if (myGrades) {
      resolve(myGrades)
    }
  })
}

//Not using async-await
//andres has a 83% avg in the class
const getStatus = userId => {
  let user
  return getUser(userId)
    .then(tempUser => {
      user = tempUser
      return getGrades(user.schoolId)
    })
    .then(grades => {
      let average = 0

      if (grades.length > 0) {
        average =
          grades.map(grade => grade.grade).reduce((a, b) => a + b) /
          grades.length
      }
      return `${user.name} has a ${average} in the class`
    })
}

//--------
//This is a promise
// ;const getStatusAlt = (userId) => {
//   return new Promise(resolve, reject => {
//     resolve('Mike')
//   })
// }

//This is the same as above using async await
// const getStatusAlt = async userId => {
//     return 'Mike'
//   }

//--------
//async - await (async always returns a promise)
//Using async-await to achieve the same as above
const getStatusAlt = async userId => {
  const user = await getUser(userId)
  const grades = await getGrades(user.schoolId)

  let average = 0

  if (grades.length > 0) {
    average =
      grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length
  }
  return `${user.name} has a ${average} in the class`
}

//calling functions
getStatusAlt(1)
  .then(status => {
    console.log(status)
  })
  .catch(e => {
    console.log(e)
  })

getUser(1)
  .then(user => {
    console.log(user)
  })
  .catch(e => {
    console.log(e)
  })

getGrades(111)
  .then(grades => {
    console.log(grades)
  })
  .catch(e => {
    console.log(e)
  })

getStatus(1)
  .then(status => {
    console.log(status)
  })
  .catch(e => {
    console.log(e)
  })
