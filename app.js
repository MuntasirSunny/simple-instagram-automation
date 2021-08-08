const { IgApiClient } = require('instagram-private-api');

require('dotenv').config();

const {readFile} = require('fs');

const {promisify} = require('util');
const readFileAsync = promisify(readFile);

const {IG_USERNAME, IG_PASSWORD} = process.env


const ig = new IgApiClient();

const postimage = async() => {
    try {

        ig.state.generateDevice(IG_USERNAME);
        await ig.simulate.preLoginFlow();
        const user = await ig.account.login(IG_USERNAME, IG_PASSWORD);

        //Uploading Image

        const path = './uploads/photo.jpg';

        const published = await ig.publish.photo({
            file: await readFileAsync(path),
            caption: 'My First Automatic Post'
        })

        console.log(published)

    } catch (error) {
        console.log(error);
    }
}

postimage();
// console.log(myname, userPassword)