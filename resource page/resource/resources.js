const btnSave =
    document.getElementById('btnSave');
let resources = "";
init();

function init() {
    let out = "";
    let resourceArray =
        JSON.parse(localStorage.getItem('resourceData'));
    if (resourceArray != null && resourceArray != "") {
        resourceArray =
            JSON.parse(localStorage.getItem('resourceData'));
        for (let x = 0; x < resourceArray.length; x++) {
            out += "<option value=" + x + ">";
            out += resourceArray[x].url;
            out += "</option>";

            document.getElementById('resourceMaster').innerHTML = out;
        }

        document.getElementById('btnWrite').addEventListener('click', function (e) {
            writeResource();
        });
        document.getElementById('resourceMaster').addEventListener('click', function (e) {
            displayResource(e.target.value);
        });

        readResource();
    } else {
        writeResource();
    }
}
function writeResource() {
    document.getElementById('read').style.display = "none";

    document.getElementById('ours').style.display = "block";

    document.getElementById('URL').value = "";

    document.getElementById('Yours').value = "";

}

function readResource() {
    document.getElementById('read').style.display = "block";

    document.getElementById('ours').style.display = "none";

}

function displayResource(resource) {
    let resourceArray =
        JSON.parse(localStorage.getItem('resourceData'));

    let out = "<h2>" + resourceArray[resource].url + "</h2>";
    out += "<h4>Date:" + new Date(resourceArray[resource].date).toLocaleString() + "</h4>";
    out += "<p>" + resourceArray[resource].yours + "</p>";
    out += "<button id='btnDelete'>Delete</button> "

    document.getElementById('resourceDisplay').innerHTML = out;

    document.getElementById('btnDelete').onclick = function () {
        resourceArray.splice(resource, 1);
        localStorage.setItem('resourceData', JSON.stringify(resourceArray));
        init();
    }
}

btnSave.onclick = function () {
    const resourceDate = new Date();
    const resourceURL = document.getElementById('URL').value;
    const resourceYours = document.getElementById('Yours').value;
    const theResource = new Resource(resourceDate, resourceURL, resourceYours);
    saveResources(theResource);
}

function saveResources(resource) {
    let resourceArray = JSON.parse(localStorage.getItem('resourceData'));
    if (resourceArray == null) {
        resourceArray = new Array();
        resourceArray.push(resource);
    } else {
        resourceArray.push(resource);
    }
    localStorage.setItem('resourceData', JSON.stringify(resourceArray));
    readResource();
    init();
}
