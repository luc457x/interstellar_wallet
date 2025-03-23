const keys = require('dotenv').config().parsed;
const fs = require('fs');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const { ipcRenderer } = require('electron');
const { Keypair } = require('@stellar/stellar-sdk');

ipcRenderer.on('showLogin', () => {
    document.getElementById('login').style.display = 'block'; /* FIX HERE TO AFFECT THE "LOGIN" ID */
});

function create_wallet() {
    const pair = Keypair.random();
    return [pair.publicKey(), pair.secret()];
};


async function load_wallet() {
    if (fs.existsSync('.env')) {
        console.log("Loading wallet...");
        return [keys.PUB_KEY, keys.SECRET_KEY];
    } else {
        console.log("No wallet found.");

        const answer = await new Promise((resolve) => {
            rl.question('Do you want to import an existing wallet? (yes/no) ', (answer) => {
                resolve(answer);
            });
        });

        if (answer.toLowerCase() === 'yes') {
            const pubKey = await new Promise((resolve) => {
                rl.question('Please enter your public key: ', (pubKey) => {
                    resolve(pubKey);
                });
            });

            const secretKey = await new Promise((resolve) => {
                rl.question('Please enter your secret key: ', (secretKey) => {
                    resolve(secretKey);
                });
            });

            fs.writeFileSync('.env', `PUB_KEY=${pubKey}\nSECRET_KEY=${secretKey}`);
            return [pubKey, secretKey];
        } else {
            return console.log('Exiting program...');
        }
    };
};
        /* const question1 = () => {
            return new Promise((resolve, reject) => {
                rl.question('No wallet found. Do you want to import an existing wallet? (yes/no) ', (answer) => {
                    resolve(answer);
                });
            });
        };

        const question2 = () => {
            return new Promise((resolve, reject) => {
                rl.question('Please enter your public key: ', (publicKey) => {
                    rl.question('Please enter your secret key: ', (secretKey) => {
                        resolve([publicKey, secretKey]);
                    });
                });
            });
        };

        const question3 = () => {
            return new Promise((resolve, reject) => {
                rl.question('Do you want to create a new wallet? (yes/no) ', (answer) => {
                    resolve(answer);
                });
            });
        };

        const createWallet = async () => {
            const answer1 = await question1();
            if (answer1.toLowerCase() === 'yes') {
                const keys = await question2();
                fs.writeFileSync('.env', `PUB_KEY=${keys[0]}\nSECRET_KEY=${keys[1]}`);
                return keys;
            } else if (answer1.toLowerCase() === 'no') {
                const answer3 = await question3();
                if (answer3.toLowerCase() === 'yes') {
                    //
                    const newPair = StellarSdk.Keypair.random();
                    console.log(`Please save your new SECRET_KEY: ${newPair.secret()}\nAnd your SEED_PHRASE: ${newPair.seed()}`);
                    fs.writeFileSync('.env', `PUB_KEY=${newPair.publicKey()}\nSECRET_KEY=${newPair.secret()}\nSEED_PHRASE=${newPair.seed()}`);
                    return [newPair.publicKey(), newPair.secret()];
                } else if (answer3.toLowerCase() === 'no') {
                    console.log('Exiting program...');
                    process.exit(0);
                } else {
                    console.log('Invalid input, please type yes or no.');
                    return createWallet();
                }
            } else {
                console.log('Invalid input, please type yes or no.');
                return createWallet();
            }
        }; */

 /*        return createWallet()
            .then((keys) => {
                rl.close();
                return keys;
            })
            .catch((err) => {
                console.error(err);
                rl.close();
                process.exit(1);
            });
    }
} */




module.exports = {
  create_wallet,
  load_wallet
};
