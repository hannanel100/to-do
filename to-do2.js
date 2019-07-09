//problem when erasing elements. i get an error. and also, when i erase last note and refresh, it comes back
(function () {
    let noteTemplate = `<div class="note hide" id={{id}}>
    <i class="fas fa-times"></i>
    <div class="text text-cl">{{text}}</div>
    <div class="date text-cl">{{date}}</div>
    <div class="time text-cl">{{time}}</div>
    </div>`;
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
    let data = JSON.parse(localStorage.getItem('noteArray'));
    //console.log(data);
    if (data != null) {
        noteArray = data;
        //console.log(data);
        //console.log(noteArray);
        buildPage(noteArray);
        lastId = noteArray[0].id;
        delIcon();
    }
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let noteObj = createObj(idNum(), toDoText.value, toDoDate.value, toDoTime.value);
        //console.log(noteObj); 
        //debugger;
        noteArray.unshift(noteObj);
        localStorage.setItem("noteArray", JSON.stringify(noteArray));
        getNoteTemplate(noteObj, noteTemplate);
        localStorage.setItem("lastId", noteObj.id);
        delIcon();
        data = JSON.parse(localStorage.getItem('noteArray'));
        clearInputs();
    });

    reset.addEventListener("click", clearInputs);

    function delIcon() {
        let notes = document.getElementsByClassName("note");
        for (let item of notes) {
            item.addEventListener("mouseenter", function (e) {
                let xIcon = this.childNodes[1];
                xIcon.style.opacity = 1;//
                xIcon.addEventListener("click", delNote);
            });
            item.addEventListener("mouseleave", function (e) {
                let xIcon = this.childNodes[1];
                if (xIcon.style.opacity == 1) {
                    xIcon.style.opacity = 0;
                }
            });
        }
    }

    function delNote() {
        let delNoteId = this.parentNode.id;
        let index = noteArray.findIndex(delId => delId.id == delNoteId);
        this.parentNode.remove();
        noteArray.splice(index, 1);
        if (noteArray.length > 0) {
            lastId = noteArray[0].id;
            localStorage.setItem("noteArray", JSON.stringify(noteArray));
        }
        else {
            lastId = null;
            localStorage.setItem("noteArray", null);
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

    function createObj(id, textValue, dateValue, timeValue) {
        let noteObjTemp = Object.create(noteObjTemplate);
        noteObjTemp.id = id;
        noteObjTemp.text = textValue;
        noteObjTemp.date = dateValue;
        noteObjTemp.time = timeValue;
        return noteObjTemp;
    }

    function noteMaker(noteObj, template) {
        let dummyDiv = document.createElement('div');
        template = template.replace('{{id}}', noteObj.id);
        template = template.replace('{{text}}', noteObj.text);
        template = template.replace('{{date}}', noteObj.date);
        template = template.replace('{{time}}', noteObj.time);
        dummyDiv.innerHTML = template;
        return dummyDiv;
    }
    function buildPage(noteArray) {
        for (let j = noteArray.length-1; j >= 0; j--) {
            getNoteTemplate(noteArray[j], noteTemplate);
        }
    }
    function getNoteTemplate(noteObj, noteTemplate) {
        noteDiv = noteMaker(noteObj, noteTemplate).firstChild;
        content.insertBefore(noteDiv, content.childNodes[0]);
        noteDiv.classList.add('show');
        noteDiv.classList.remove('hide');
    }

    function clearInputs() {
        toDoText.value = '';
        toDoDate.value = '';
        toDoTime.value = '';
    }
})();
