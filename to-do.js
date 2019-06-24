let toDoText = document.getElementById("to-do-text");
let toDoDate = document.getElementById("to-do-date");
let toDoTime = document.getElementById("to-do-time");
let add = document.getElementById("add");
let reset = document.getElementById("reset");
let content = document.getElementById("content");
let noteDiv = '';
let noteArray = [];
let noteObj = {
    text: "some",
    date: "some",
    time: "some"
};
let appNodes = [];
let ctr = 0;
add.addEventListener("click", function (e) {
    e.preventDefault();
    let textValue = toDoText.value;
    toDoText.value = '';
    let dateValue = toDoDate.value;
    toDoDate.value = '';
    let timeValue = toDoTime.value;
    toDoTime.value = '';
    buildPage(textValue, dateValue, timeValue);
    noteObj.text = textValue;
    noteObj.date = dateValue;
    noteObj.time = timeValue;
    noteArray.push(Object.create(noteObj));
    //JSON.stringify(noteArray)
    localStorage.setItem("appNodes[" + ctr + "]", JSON.stringify(noteObj));
    ctr++;
});


function buildPage(textValue, dateValue, timeValue) {


    noteDiv = document.createElement('div');
    noteDiv.setAttribute('class', 'note');
    let textDiv = buildDiv("text-cl", "text");
    let dateDiv = buildDiv("text-cl", "date");
    let timeDiv = buildDiv("text-cl", "time")
    textDiv.innerHTML = textValue;
    dateDiv.innerHTML = dateValue;
    timeDiv.innerHTML = timeValue;
    noteDiv.appendChild(textDiv);
    noteDiv.appendChild(dateDiv);
    noteDiv.appendChild(timeDiv);
    content.insertBefore(noteDiv, content.childNodes[0]);


}
function buildDiv(cl1, cl2) {
    var divElement = document.createElement('div');
    divElement.setAttribute('class', cl1 + " " + cl2);
    return divElement;
}


