(function () {
    let toDoText = document.getElementById("to-do-text");
    let toDoDate = document.getElementById("to-do-date");
    let toDoTime = document.getElementById("to-do-time");
    let add = document.getElementById("add");
    let reset = document.getElementById("reset");
    let content = document.getElementById("content");
    let noteDiv = '';
    let noteArray;
    let xIcon = '';
    let lastId;
    let noteObjTemplate = {
        id: "note0",
        text: "some",
        date: "some",
        time: "some"
    };
    let arrOfObj = {
        arr: [""]
    };
    if (localStorage.length > 0) {
        noteArray = (JSON.parse(localStorage.getItem("noteArray")));
    }
    else {
        noteArray = [];
    }


    add.addEventListener("click", function (e) {
        e.preventDefault();
        let textValue = toDoText.value;
        let dateValue = toDoDate.value;
        let timeValue = toDoTime.value;
        let noteObj = createObj(textValue, dateValue, timeValue);
        buildPage(noteObj.text, noteObj.date, noteObj.time);
        noteArray.push(noteObj);
        localStorage.setItem("noteArray", JSON.stringify(noteArray));
        //get the array of objects. 
        arrOfObj = (JSON.parse(localStorage.getItem("noteArray")));
        //console.log("arrOfObj[0].text: " + JSON.stringify(arrOfObj[0].text));
        if (arrOfObj.length > 0) {
            lastId = "note" + (arrOfObj.length);//gets the last id
        }
        else {
            lastId = "note0";
        }

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
    function buildPage(textValue, dateValue, timeValue) {
        //let noteDivId = "note" + Number(ctr);
        noteDiv = document.createElement('div');
        noteDiv.setAttribute('class', 'note hide');
        noteDiv.setAttribute('id', lastId);
        buildNote(noteDiv, textValue, dateValue, timeValue);
        //ctr++;
        //console.log("noteDiv id: " + noteDivId);
        //return noteDivId;
    }

    function buildDiv(cl1, cl2) {
        var divElement = document.createElement('div');
        divElement.setAttribute('class', cl1 + " " + cl2);
        return divElement;
    }
    function buildNote(noteDiv, textValue, dateValue, timeValue) {
        let textDiv = buildDiv("text-cl", "text");
        let dateDiv = buildDiv("text-cl", "date");
        let timeDiv = buildDiv("text-cl", "time");
        xIcon = document.createElement('i');
        xIcon.setAttribute('class', 'fas fa-times');
        textDiv.innerHTML = textValue;
        dateDiv.innerHTML = dateValue;
        timeDiv.innerHTML = timeValue;
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