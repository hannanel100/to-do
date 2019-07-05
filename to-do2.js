//still need to implement ids to notes and in local storage.
//then deal with erasing notes
(function () {
    const form = document.querySelector("form");
    const toDoText = document.getElementById("to-do-text");
    const toDoDate = document.getElementById("to-do-date");
    const toDoTime = document.getElementById("to-do-time");
    const content = document.getElementById("content");
    const reset = document.getElementById("reset");
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
        for (let i = 0; i < data.length; i++) {
            getNoteTemplate(data[i]);
        }
        noteArray = data;
    }
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let noteObj = createObj(toDoText.value, toDoDate.value, toDoTime.value);
        noteArray.push(noteObj);
        localStorage.setItem("noteArray", JSON.stringify(noteArray));
        getNoteTemplate(noteObj);
        clearInputs(); 
    });

    reset.addEventListener("click", clearInputs);

    function delIcon() {
        let notes = document.getElementsByClassName("note");
        for (let i = 0; i < notes.length; i++) {
            notes[i].addEventListener("mouseenter", function (e) {
                this.childNodes[1].style.opacity = 1;
            })
            notes[i].addEventListener("mouseleave", function (e) {
                if (this.childNodes[1].style.opacity == 1) {
                    this.childNodes[1].style.opacity = 0;
                }
            });
        }
    }

    function createObj(textValue, dateValue, timeValue) {
        let noteObjTemp = Object.create(noteObjTemplate);
        noteObjTemp.text = textValue;
        noteObjTemp.date = dateValue;
        noteObjTemp.time = timeValue;
        return noteObjTemp;
    }

    function noteMaker(noteObj, template) {
        let dummyDiv = document.createElement('div');
        template = template.replace('{{text}}', noteObj.text);
        template = template.replace('{{date}}', noteObj.date);
        template = template.replace('{{time}}', noteObj.time);
        dummyDiv.innerHTML = template
        return dummyDiv;
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
