const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
const Validator = require('validator');

readline.question(`Apa namamu? `, nameUser => {
    readline.question(`Apa emailmu? `, emailUser => {
        const isEmailValid = Validator.isEmail(emailUser);
        readline.question(`Apa nomor handphonemu? `, nohp => {
            const isNumberPhoneValid = Validator.isMobilePhone(nohp,'id-ID');
            readline.question(`Apa alamatmu? `, alamat => {

                if (isEmailValid && isNumberPhoneValid) {
                    const dataUser = { 
                        nama: nameUser,
                        email: emailUser,
                        no_hp: nohp,
                        alamat: alamat
                    }
                    console.log(`Hai ${nameUser}, datamu sukses diproses dengan email ${emailUser}, nomor HP ${nohp}, dan alamatmu di ${alamat}`);

                    const rawData = fs.readFileSync('./data/contacts.json','utf-8');
                    const user = JSON.parse(rawData);
                    
                    user.push(dataUser);
                    
                    const jsonContent = JSON.stringify(user);
                    fs.writeFileSync('./data/contacts.json', jsonContent);
                }
                
                if (!isEmailValid) {
                    console.log("WARN : Email tidak sesuai format");
                }

                if (!isNumberPhoneValid) {
                    console.log("WARN : No hp tidak sesuai format");
                }

                readline.close();
            })
        })
    })
})