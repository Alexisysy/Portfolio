const projectBoxes = document.querySelectorAll('.project_card');
var i = 1
var projects = {}

fetch("./data/projectBoxes.json")
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        projects = data
        console.log(projects);
        projectBoxes.forEach(setBoxes);
    });

function setBoxes(box) {
    const currentProjectId = "project" + i;
    console.log("url(" + projects[currentProjectId]["background"] + ")");
    box.style.backgroundImage = "url(" + projects[currentProjectId]["background"] + ")";
    let divInBox = box.querySelector("div")
    divInBox.innerHTML = projects[currentProjectId]["title"]
    
    box.addEventListener('click', () => {
        sessionStorage.setItem('selectedProject', currentProjectId);
        window.location.href = "./pages/project.html";
    })
    
    i++
}