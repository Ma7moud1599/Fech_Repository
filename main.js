//main variablse
let TheInput = document.querySelector(".get-repos input");
let getbutton = document.querySelector(".get-button");
let reposdata = document.querySelector(".show-data");

getbutton.onclick = function () {
  getRepos();
};

// get repos function
function getRepos() {
  // if the input is empty
  if (TheInput.value == "") {
    reposdata.innerHTML = "<span>Please Write Githup Username.</span>";
  } else {
    fetch(`http://api.github.com/users/${TheInput.value}/repos`)
      .then((response) => response.json())
      .then((repos) => {
        reposdata.innerHTML = "";

        //loop on repos
        repos.forEach((repo) => {
          // creat div
          let mainDiv = document.createElement("div");
          //creat repo name text
          let repoName = document.createTextNode(repo.name);
          // append text name to main div
          mainDiv.appendChild(repoName);

          // creat repo url anchor
          let theUrl = document.createElement("a");
          // creat url text
          let urltext = document.createTextNode("Visit");
          // append url text to the url element
          theUrl.appendChild(urltext);
          // add the hypertext reference
          theUrl.href = `https://github.com/${TheInput.value}/${repo.name}`;
          //set attribute blank
          theUrl.setAttribute("target", "_blank");
          mainDiv.appendChild(theUrl);
          // append main div to the container

          // creat stars count span
          let starsSpan = document.createElement("span");
          // creat stars count text
          let starstext = document.createTextNode(
            `stars ${repo.stargazers_count}`
          );
          // append stars text to stars span
          starsSpan.appendChild(starstext);
          //append stars count span to main div
          mainDiv.appendChild(starsSpan);
          //add class to main div
          mainDiv.className = "repo-box";
          // append the url to the main div
          reposdata.appendChild(mainDiv);
        });
      });
  }
}
