const fs = require('fs');

function findIdByName(fileName, name) {
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        const users = data.trim().split('\n');
        const user = users.find(user => user.includes(name));
        if (user) {
            const id = user.split(' ')[4];
            return id.trim();
        } else {
            console.log(`Користувач з іменем ${name} не знайдений.`);
            return null;
        }
    } catch (error) {
        console.error('Помилка при читанні файлу:', error);
        return null;
    }
}

function findInfoById(fileName, id) {
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        const info = JSON.parse(data);
        const user = info.find(user => user.id === id);
        return user;
    } catch (error) {
        console.error('Помилка при читанні файлу:', error);
        return null;
    }
}

function main() {
    const usersFileName = 'hw3/hw3UsersNumber.txt';
    const infoFileName = 'hw3/unique_users.json';

    // Шукаємо номер за іменем "Артем Буруменський", Яків Мирончук, Буруменський, тест
    const myID = findIdByName(usersFileName, 'Артем');
    if (myID) {
        const slicedId = myID.slice(0, -2);
        if (slicedId) {
            const info = findInfoById(infoFileName, slicedId);
            if (info) {
                const lastHobby = info.hobbies[info.hobbies.length - 1];
                console.log(info);
                console.log('- address:', info.address.city + ', ' + info.address.street);
                console.log('- hobbies:', lastHobby);
            } else {
                console.log(`Інформацію за id = "${slicedId}" не знайдено.`);
            }
        }
    }
}

main();
