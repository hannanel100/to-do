let toDoText = document.getElementById("to-do-text");
let toDoDate = document.getElementById("to-do-date");
let toDoTime = document.getElementById("to-do-time");
let add = document.getElementById("add");
let reset = document.getElementById("reset");
let content = document.getElementById("content");
let noteDiv = '';
let noteArray = [];
let xIcon = '';
let noteObjTemplate = {
    id: "some",
    text: "some",
    date: "some",
    time: "some"
};
let objOfArray = {
    arr: []
}
let ctr = 0;
add.addEventListener("click", function (e) {
    e.preventDefault();
    let textValue = toDoText.value;
    toDoText.value = '';
    let dateValue = toDoDate.value;
    toDoDate.value = '';
    let timeValue = toDoTime.value;
    toDoTime.value = '';
    let noteObj = Object.create(noteObjTemplate);
    let tempId;
    tempId = buildPage(textValue, dateValue, timeValue);
    noteObj.id = tempId; 
    noteObj.text = textValue;
    noteObj.date = dateValue;
    noteObj.time = timeValue;
    noteArray.push(noteObj);
    //objOfArray.arr = JSON.stringify(noteArray);
    localStorage.setItem("noteArray", JSON.stringify(noteArray));
    objOfArray = localStorage.getItem("noteArray");
    console.log("objOfArray after parse: "+ JSON.parse(objOfArray));
    console.log(objOfArray[0].id)
    //still need to work on local storage

    noteDiv.addEventListener("mouseenter", function(){
        this.childNodes[0].style.opacity = 1;
        xIcon.addEventListener("click",function(){
            
            //delete from local storage and reload page
        });
    })
    noteDiv.addEventListener("mouseleave", function(){
        if(this.childNodes[0].style.opacity == 1){
            this.childNodes[0].style.opacity = 0;
        }
    });
});


function buildPage(textValue, dateValue, timeValue) {
    let noteDivId = "note"+ctr;
    noteDiv = document.createElement('div');
    noteDiv.setAttribute('class', 'note hide');
    noteDiv.setAttribute('id', noteDivId);
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
    ctr++;
    console.log("noteDiv id: "+noteDivId);
    return noteDivId;
}

function buildDiv(cl1, cl2) {
    var divElement = document.createElement('div');
    divElement.setAttribute('class', cl1 + " " + cl2);
    return divElement;
}



