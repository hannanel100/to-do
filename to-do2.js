(function () {
    const form = document.querySelector("form");
    const toDoText = document.getElementById("to-do-text");
    const toDoDate = document.getElementById("to-do-date");
    const toDoTime = document.getElementById("to-do-time");
    const content = document.getElementById("content");
    const reset = document.getElementById("reset");
    let noteArray = [];
    localStorage.setItem('noteArray', JSON.stringify(noteArray))
    let noteObjTemplate = {
        id: "some",
        text: "some",
        date: "some",
        time: "some"
    };
    const data = JSON.parse(localStorage.getItem('noteArray'));
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let noteObj = createObj(toDoText.value, toDoDate.value, toDoTime.value);
        noteArray.push(noteObj);
        getNoteTemplate(function (t) {
            // t is the html template
            noteMaker(noteObj, t);
            //const noteDiv = document.getElementsByClassName("note");
            // noteDiv.classList.add('show'); I get an error - has to do with 
            // noteDiv.classList.remove('hide');
        })
        clearInputs();
    });
    reset.addEventListener("click", clearInputs);

    function createObj(textValue, dateValue, timeValue) {
        let noteObj = Object.create(noteObjTemplate);
        noteObj.text = textValue;
        noteObj.date = dateValue;
        noteObj.time = timeValue;
        return noteObj;
    }
    function noteMaker(noteObj, template) {
        template = template.replace('{{text}}', noteObj.text);
        template = template.replace('{{date}}', noteObj.date);
        template = template.replace('{{time}}', noteObj.time);
        content.innerHTML += template;
    }
    function getNoteTemplate(callback) {
        var a = new XMLHttpRequest(); // ajax object
        // when data received
        a.addEventListener("load", function () {
            callback(this.responseText);
            const noteDiv = document.getElementsByClassName("note");
            noteDiv.classList.add('show'); //I get an error - has to do with 
            noteDiv.classList.remove('hide');
        });
        // what is the resource address
        a.open("GET", 'template.html');
        // invoke ajax request
        a.send();
    }
    /**/ 
    function clearInputs() {
        toDoText.value = '';
        toDoDate.value = '';
        toDoTime.value = '';
    }
})();
