(function () {
    let toDoText = document.getElementById("to-do-text");
    let toDoDate = document.getElementById("to-do-date");
    let toDoTime = document.getElementById("to-do-time");
    let add = document.getElementById("add");
    let reset = document.getElementById("reset");
    let content = document.getElementById("content");
    let noteDiv = '';
    let noteArray = JSON.parse(localStorage.getItem("noteArray"));
    let xIcon = '';
    let lastId = localStorage.getItem("lastId");
    let ctr;
    let rebuild = true;
    let noteObjTemplate = {
        id: "some",
        text: "some",
        date: "some",
        time: "some"
    };

    if (noteArray && noteArray.length > 0) {
        noteArray = (JSON.parse(localStorage.getItem("noteArray")));
        //console.log("if noteArray.legth>0" + noteArray.length);
        ctr = Number(lastId.match(/\d+/g).map(Number)) + 1;
        for (let i = 0; i < noteArray.length; i++) {
            buildPage(noteArray[i]);
            noteDiv.addEventListener("mouseenter", function (e) {
                this.childNodes[0].style.opacity = 1;
        
            })
            noteDiv.addEventListener("mouseleave", function (e) {
                if (this.childNodes[0].style.opacity == 1) {
                    this.childNodes[0].style.opacity = 0;
                }
            });
        }
    }
    else {
        rebuild = false;
        noteArray = [];
        ctr = 0;
    }


    add.addEventListener("click", function (e) {

        e.preventDefault();
        let noteObj = createObj(toDoText.value, toDoDate.value, toDoTime.value);
        buildPage(noteObj);
        noteArray.push(noteObj);
        //console.log(noteArray);
        reloadArr();
        noteDiv.addEventListener("mouseenter", function (e) {
            this.childNodes[0].style.opacity = 1;
    
        })
        noteDiv.addEventListener("mouseleave", function (e) {
            if (this.childNodes[0].style.opacity == 1) {
                this.childNodes[0].style.opacity = 0;
            }
        });
        return clear();
    });
    


    function reloadArr() {
        localStorage.setItem("noteArray", JSON.stringify(noteArray));
        //get the array of objects. 
        noteArray = (JSON.parse(localStorage.getItem("noteArray")));
        localStorage.setItem("lastId", lastId);//saves last id to localSt orage. still gets overwritten when reload page
        lastId = localStorage.getItem("lastId");
    }
    function createObj(textValue, dateValue, timeValue) {
        let noteObj = Object.create(noteObjTemplate);

        noteObj.text = textValue;
        noteObj.date = dateValue;
        noteObj.time = timeValue;
        return noteObj;
    }
    function updatePage(noteObj) {
        noteDiv = document.createElement('div');
        noteDiv.setAttribute('class', 'note hide');
        noteDiv.setAttribute('id', noteObj.id);
        buildNote(noteDiv, noteObj);
    }
    function buildPage(noteObj) {
        if(rebuild === true){
            updatePage(noteObj);
        }
        else{
            noteDiv = document.createElement('div');
            noteDiv.setAttribute('class', 'note hide');
            lastId = "note" + ctr;
            noteDiv.setAttribute('id', lastId);
            noteObj.id = lastId;
            buildNote(noteDiv, noteObj);
            ctr++;
        }
        
    }

    function buildDiv(cl1, cl2) {
        var divElement = document.createElement('div');
        divElement.setAttribute('class', cl1 + " " + cl2);
        return divElement;
    }
    function buildNote(noteDiv, noteObj) {
        let textDiv = buildDiv("text-cl", "text");
        let dateDiv = buildDiv("text-cl", "date");
        let timeDiv = buildDiv("text-cl", "time");
        xIcon = document.createElement('i');
        xIcon.setAttribute('class', 'fas fa-times');
        textDiv.innerHTML = noteObj.text;
        dateDiv.innerHTML = noteObj.date;
        timeDiv.innerHTML = noteObj.time;
        noteDiv.appendChild(xIcon);
        noteDiv.appendChild(textDiv);
        noteDiv.appendChild(dateDiv);
        noteDiv.appendChild(timeDiv);
        content.insertBefore(noteDiv, content.childNodes[0]);
        noteDiv.classList.add('show');
        noteDiv.classList.remove('hide');
    }

    function clear() {
        toDoText.value = '';
        toDoDate.value = '';
        toDoTime.value = '';
    }
})();