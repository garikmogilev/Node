const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('done');
    }, 3000);
});

promise1.then((value) => {
    console.log(value);
});

console.log(promise1);

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('done');
    }, 5000);
});

promise2.then((value) => {
    console.log(value);
});

console.log(promise2);