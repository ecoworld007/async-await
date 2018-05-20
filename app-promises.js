const users =[
    {
        id: 1,
        name: 'luffy',
        schoolId: 101
    },
    {
        id: 2,
        name: 'zoro',
        schoolId: 99
    }
];

const grades = [
    {
        id: 1,
        schoolId: 101,
        grade: 89
    },
    {
        id: 2,
        schoolId: 101,
        grade: 99
    },{
        id: 3,
        schoolId: 99,
        grade: 98
    }
];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        let user = users.find( user => user.id === id);
        if(user){
            console.log('user found');
            resolve(user);
        }else{
            reject('user not found');
        }
    });
}
getUser(1).then(user => console.log(user)).catch(err => console.log(err));

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
       resolve(grades.filter(grade => grade.schoolId === schoolId));
    });
}

getGrades(101).then(grades => console.log(grades));
let user;
const getStatus = (userId) => {
    return getUser(userId).then(tempUser => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then(grades => {
        return grades.map(grade => grade.grade).reduce(((a,b) => (a+b)/grades.length));
    }).then(average => `${user.name} has a ${average}% in a class`);
};

getStatus(3).then(status => console.log(status)).catch(err => console.log(err));;