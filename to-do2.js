//problem when erasing elements. i get an error. and also, when i erase last note and refresh, it comes back
(function () {
    const form = document.querySelector("form");
    const toDoText = document.getElementById("to-do-text");
    const toDoDate = document.getElementById("to-do-date");
    const toDoTime = document.getElementById("to-do-time");
    const content = document.getElementById("content");
    const reset = document.getElementById("reset");
    let lastId;
    //const idRefresh = JSON.parse(localStorage.getItem('lastId'));
    let id = -1;
    let noteArray = [];
    let noteDiv;
    let noteObjTemplate = {
        id: "some",
        text: "some",
        date: "some",
        time: "some"
    };
    const data = JSON.parse(localStorage.getItem('noteArray'));
    if (data != null) {
        noteArray = data;
        //can be put in function - repeated twice
        buildPage(noteArray);
        lastId = noteArray[0].id;
    }
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let noteObj = createObj(toDoText.value, toDoDate.value, toDoTime.value);
        noteArray.unshift(noteObj);
        localStorage.setItem("noteArray", JSON.stringify(noteArray));
        getNoteTemplate(noteObj);
        localStorage.setItem("lastId", noteObj.id);
        clearInputs();
    });

    reset.addEventListener("click", clearInputs);

    function delIcon() {
        let notes = document.getElementsByClassName("note");
        let xIcon = document.getElementsByClassName("fas fa-times");
        for (let i = 0; i < notes.length; i++) {
            notes[i].addEventListener("mouseenter", function (e) {
                this.childNodes[1].style.opacity = 1;
                //add click event listener to erase note
                xIcon[i].addEventListener("click", function () {
                    let delNoteId = this.parentNode.id;
                    let index = noteArray.findIndex(delId => delId.id == delNoteId);
                    noteArray.splice(index, 1);
                    content.innerHTML = "";
                    //can be put in function
                    buildPage(noteArray);
                    lastId = noteArray[0].id;
                    console.log(noteArray);
                    localStorage.setItem("noteArray", JSON.stringify(noteArray));
                })
            })
            notes[i].addEventListener("mouseleave", function (e) {
                if (this.childNodes[1].style.opacity == 1) {
                    this.childNodes[1].style.opacity = 0;
                }
            });
        }
    }

    function idNum() {
        if (lastId == null) {
            id++;
            return "note" + id;
        }
        else {
            lastId = JSON.parse(localStorage.getItem("noteArray"))[0].id;
            id = (Number(lastId.charAt(4)) + 1);
            return "note" + id;
        }
    }

    function createObj(textValue, dateValue, timeValue) {
        let noteObjTemp = Object.create(noteObjTemplate);
        //console.log("before" + JSON.stringify(noteObjTemp));
        noteObjTemp.id = idNum();
        noteObjTemp.text = textValue;
        noteObjTemp.date = dateValue;
        noteObjTemp.time = timeValue;
        //console.log("after: "+ JSON.stringify(noteObjTemp));
        return noteObjTemp;
    }

    function noteMaker(noteObj, template) {
        let dummyDiv = document.createElement('div');
        template = template.replace('{{id}}', noteObj.id);
        template = template.replace('{{text}}', noteObj.text);
        template = template.replace('{{date}}', noteObj.date);
        template = template.replace('{{time}}', noteObj.time);
        dummyDiv.innerHTML = template
        return dummyDiv;
    }
    function buildPage(noteArray){
        for (let j = noteArray.length; j >= 0; j--) {
            getNoteTemplate(noteArray[j]);
        }
    }
    function getNoteTemplate(noteObj) {
        var xhr = new XMLHttpRequest(); // ajax object
        // when data received
        xhr.addEventListener("load", function () {
            noteDiv = noteMaker(noteObj, this.responseText).firstChild;
            content.insertBefore(noteDiv, content.childNodes[0]);
            noteDiv.classList.add('show');
            noteDiv.classList.remove('hide');
            delIcon();
        });
        // what is the resource address
        xhr.open("GET", 'template.html');
        // invoke ajax request
        xhr.send();
    }
    function clearInputs() {
        toDoText.value = '';
        toDoDate.value = '';
        toDoTime.value = '';
    }
})();
