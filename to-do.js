(function () {
    let toDoText = document.getElementById("to-do-text");
    let toDoDate = document.getElementById("to-do-date");
    let toDoTime = document.getElementById("to-do-time");
    let add = document.getElementById("add");
    let reset = document.getElementById("reset");
    let content = document.getElementById("content");
    let noteDiv = '';
    let noteArray =[];
    let xIcon = '';
    let lastId;
    let noteObjTemplate = {
        id: "note"+lastId,
        text: "some",
        date: "some",
        time: "some"
    };
    let arrOfObj = {
        arr: [""]
    };
    if (localStorage.length > 1) {
        noteArray = (JSON.parse(localStorage.getItem("noteArray")));
        console.log()
        lastId = "note" + (noteArray.length);//gets the last id
    }
    else {
        noteArray = [];
        lastId = "note0";
    }


    add.addEventListener("click", function (e) {
        e.preventDefault();
        let noteObj = createObj(toDoText.value, toDoDate.value, toDoTime.value);
        buildPage(noteObj);
        noteArray.push(noteObj);
        localStorage.setItem("noteArray", JSON.stringify(noteArray));
        //get the array of objects. 
        noteArray = (JSON.parse(localStorage.getItem("noteArray")));
        //console.log("arrOfObj[0].text: " + JSON.stringify(arrOfObj[0].text));
        // if (noteArray.length > 0) {
        //     lastId = "note" + (noteArray.length);//gets the last id
        //     debugger;
        // }
        // else {
        //     lastId = "note0";
        // }

        localStorage.setItem("lastId", lastId);//saves last id to localStorage. still gets overwritten when reload page
        noteDiv.addEventListener("mouseenter", function () {
            this.childNodes[0].style.opacity = 1;
            xIcon.addEventListener("click", function () {
                //delete from local storage and reload page
            });
        })
        noteDiv.addEventListener("mouseleave", function () {
            if (this.childNodes[0].style.opacity == 1) {
                this.childNodes[0].style.opacity = 0;
            }
        });
        return clear();
    });

    function createObj(textValue, dateValue, timeValue) {
        let noteObj = Object.create(noteObjTemplate);
        noteObj.id = lastId;
        noteObj.text = textValue;
        noteObj.date = dateValue;
        noteObj.time = timeValue;
        return noteObj;
    }
    function buildPage(noteObj) {
        noteDiv = document.createElement('div');
        noteDiv.setAttribute('class', 'note hide');
        noteDiv.setAttribute('id', lastId);
        buildNote(noteDiv, noteObj);
        //ctr++;
        //console.log("noteDiv id: " + noteDivId);
        //return noteDivId;
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