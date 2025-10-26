const main = document.querySelector('main')
var idProject = sessionStorage.getItem('selectedProject') || "project1"
var projects = {}

const headerName = document.getElementById("homeA")
const headerJob = document.getElementById("homeB")

fetch("../data/projectBoxes.json")
    .then(response => response.json())
    .then(data => {
        projects = data
        createSections()
        changeIntro()
        setLinkHeader()
    })

function createSections() {
    const project = projects[idProject]
    
    if (project && project.description) {
        Object.keys(project.description).forEach(key => {
            const section = document.createElement('section')
            const title = document.createElement('h4')
            const content = document.createElement('p')
            
            title.textContent = key.charAt(0).toUpperCase() + key.slice(1)

            if(typeof project.description[key] === 'object'){
                content.textContent = project.description[key]["description"]
                section.appendChild(title)
                section.appendChild(content)
                if(project.description[key]["image"]) {
                    if(Array.isArray(project.description[key]["image"])){
                        project.description[key]["image"].forEach((imageSrc, index) => {
                            let img = document.createElement('img')
                            img.src = imageSrc
                            
                            let imageContainer = document.createElement('div')
                            imageContainer.className = 'image-container'
                            imageContainer.appendChild(img)
                            
                            if(project.description[key]["legend"] && project.description[key]["legend"][index]) {
                                let legend = document.createElement('p')
                                legend.className = 'image-legend'
                                legend.textContent = project.description[key]["legend"][index]
                                imageContainer.appendChild(legend)
                            }

                            section.appendChild(imageContainer)
                        });
                    } else {
                        let img = document.createElement('img')
                        img.src = project.description[key]["image"]
                        
                        let imageContainer = document.createElement('div')
                        imageContainer.className = 'image-container'
                        imageContainer.appendChild(img)
                        
                        if(project.description[key]["legend"]) {
                            let legend = document.createElement('p')
                            legend.className = 'image-legend'
                            legend.textContent = project.description[key]["legend"]
                            imageContainer.appendChild(legend)
                        }
                        
                        section.appendChild(imageContainer)
                    }
                    } else if (project.description[key]["video"]) {
                        const video = document.createElement('video')
                        video.src = project.description[key]["video"]
                        video.controls = true
                        video.autoplay = true
                        video.muted = true
                        video.loop = true
                        section.appendChild(video)
                        const legend = document.createElement('p')
                        legend.className = 'image-legend'
                        legend.textContent = project.description[key]["legend"]
                        section.appendChild(legend)
                    }
            } else {
                content.textContent = project.description[key]
                
                section.appendChild(title)
                section.appendChild(content)
            }
            
            main.appendChild(section)
        })
    }
}

function changeIntro() {
    const project = projects[idProject]
    const intro = document.getElementById('intro')
    const title = intro.querySelector('h3')
    const group = document.getElementById("group")
    const role = document.getElementById("role")
    const techno = document.getElementById("techno")
    const calendar = document.getElementById("calendar")
    const download = document.getElementById("download")


    title.innerHTML = project.title
    group.innerHTML = `<img src="../images/projects/icone/group.png" class="icon"> Nombre de personne dans l'équipe : ${project.teamSize}`
    role.innerHTML = `<img src="../images/projects/icone/role.png" class="icon">Rôle : ${project.role}`
    techno.innerHTML = `<img src="../images/projects/icone/techno.png" class="icon">Technologies utilisées : ${project.technologies}`
    download.href = project.link
    if (project.date.length > 2){
        calendar.innerHTML = `<img src="../images/projects/icone/calendar.png" class="icon">Date et temps de production : ${project.date[0]} | ${project.date[1]} | ${project.date[2]}`
    } else {
        calendar.innerHTML = `<img src="../images/projects/icone/calendar.png" class="icon">Date et temps de production : ${project.date[0]} | ${project.date[1]}`
    }
    
}

function setLinkHeader(){
    headerName.addEventListener('click', () => {
        window.location.href = "../index.html";
    })
    headerJob.addEventListener('click', () => {
        window.location.href = "../index.html";
    })
}