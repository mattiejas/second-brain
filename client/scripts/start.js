const childProcess = require("child_process");
const fs = require("fs");

function writeToEnv(key, value) {
  const empty = key === "" && value === "";

  if (empty) {
    fs.writeFile(".env.local", "", () => {});
  } else {
    fs.appendFile(".env.local", `${key}='${(value ?? '').trim()}'\n`, (err) => {
      if (err) console.log(err);
    });
  }
}

// reset .env file
writeToEnv();

childProcess.exec("git rev-parse --abbrev-ref HEAD", (err, stdout) => {
  writeToEnv("REACT_APP_GIT_BRANCH", stdout);
});

childProcess.exec("git rev-parse --short HEAD", (err, stdout) => {
  writeToEnv("REACT_APP_GIT_SHA", stdout);
});
