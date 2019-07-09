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
    //checking if page is refreshed
    if (data != null) {
        noteArray = data;
        buildPage(noteArray);//rebuilding notes from local storage
        lastId = noteArray[0].id;
        delIcon();//enabling deletion icon
    }
    //accepting user data
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let noteObj = createObj(idNum(), toDoText.value, toDoDate.value, toDoTime.value);//function returns object of note - id+user input
        noteArray.unshift(noteObj);
        localStorage.setItem("noteArray", JSON.stringify(noteArray));
        getNoteTemplate(noteObj, noteTemplate);//applying noteObj to template and placing on screen
        localStorage.setItem("lastId", noteObj.id);
        delIcon();//enabling deletion icon
        data = JSON.parse(localStorage.getItem('noteArray'));
        clearInputs();//clearing input fields
    });

    reset.addEventListener("click", clearInputs);//enabling user to clear input fields with reset button
    //function enabling deletion icons - visiblity and then clickability
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
    //function called when clicking x icon - deletes note from screen and from local storage
    function delNote() {
        let delNoteId = this.parentNode.id;
        let index = noteArray.findIndex(delId => delId.id == delNoteId);
        this.parentNode.remove();
        noteArray.splice(index, 1);
        if (noteArray.length > 0) {
            lastId = noteArray[0].id;
            localStorage.setItem("noteArray", JSON.stringify(noteArray));
        }
        //taking care of deletion of all notes
        else {
            lastId = null;
            localStorage.setItem("noteArray", null);
        }
    }
    //function that deals with returning ids to notes
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
    //function that creates and returns noteObj based on id and user input
    function createObj(id, textValue, dateValue, timeValue) {
        let noteObjTemp = Object.create(noteObjTemplate);
        noteObjTemp.id = id;
        noteObjTemp.text = textValue;
        noteObjTemp.date = dateValue;
        noteObjTemp.time = timeValue;
        return noteObjTemp;
    }
    //function that uses template and noteObj to make and return div containing note
    function noteMaker(noteObj, template) {
        let dummyDiv = document.createElement('div');
        template = template.replace('{{id}}', noteObj.id);
        template = template.replace('{{text}}', noteObj.text);
        template = template.replace('{{date}}', noteObj.date);
        template = template.replace('{{time}}', noteObj.time);
        dummyDiv.innerHTML = template;
        return dummyDiv;
    }
    //function that deals with building notes on page from local storage after refresh
    function buildPage(noteArray) {
        for (let j = noteArray.length-1; j >= 0; j--) {
            getNoteTemplate(noteArray[j], noteTemplate);
        }
    }
    //function that gets template and noteObj and calls helper function to create note and adds note to page
    function getNoteTemplate(noteObj, noteTemplate) {
        noteDiv = noteMaker(noteObj, noteTemplate).firstChild;
        content.insertBefore(noteDiv, content.childNodes[0]);
        noteDiv.classList.add('show');
        noteDiv.classList.remove('hide');
    }
    //function to clear input fields
    function clearInputs() {
        toDoText.value = '';
        toDoDate.value = '';
        toDoTime.value = '';
    }
})();
