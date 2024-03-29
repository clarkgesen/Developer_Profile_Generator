const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require('axios').default;
const writeFileAsync = util.promisify(fs.writeFile);
const generateHTML = require("./generateHTML");
// const jsPDF = require("jspdf");

// global.window = { document: { createElementNS: () => { return {} } } };
// global.navigator = {};
// global.btoa = () => { };





function promptUser() {
  return inquirer.prompt([
    {
      message: "What is your github username?",
      type: "input",
      name: "userName",
    }, {
      message: "What is your favorite color?",
      type: "list",
      name: "color",
      choices: ["Red", "Blue", "Green", "Pink"]
    }
  ]);
}

promptUser()
  .then(function (results) {
    // console.log(results.userName);
    // console.log(results.color);
    const userName = results.userName;
    const queryUrl = `https://api.github.com/users/${userName}`;
    console.log(queryUrl);
    axios
      .get(queryUrl)
      .then(function (res) {

        // console.log(res.data);
        const profile = {
          color: results.color,
          ...res.data
        }

        // console.log(profile);
        // console.log(generateHTML(profile));
        console.log(profile);
        const html = generateHTML(profile);

        // generatePDF();

        return writeFileAsync("index.html", html);

        

      })
  })

  // function generatePDF(){
  //   var doc = new jsPDF();

  //   doc.fromHTML($('body').get(0), 20, 20, {'width': 500});

  //     doc.save('Generated_Profile.pdf')
  //   }

// async function init() {
//   try {
//     const profile = await promptUser();

//     const html = generateHTML(profile);

//     await writeFileAsync("index.html", html);

//     console.log("Successfully wrote to index.html");
//   } catch (err) {
//     console.log(err);
//   }
// }

// init();


module.exports = promptUser;


