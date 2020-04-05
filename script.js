// Sets empty list elements to variable and checks local storage for saved reminders

var emptyList = $(".emptyList")
var reminders = JSON.parse(localStorage.getItem("reminders"))

// If there is reminders in local storage, loop through both empty list and reminders array and append each reminder to the list, does not append empty reminders
if (reminders !== null) {
    for (let index = 0; index < emptyList.length; index++) {
        let remInd = (reminders[index])
        if (reminders[index] !== null) {
            let newListItem = $("<li>")
            $(newListItem).text(remInd)
            $(emptyList[index]).append(newListItem)
        }
    }
    // Else create an empty array 9 items long
} else {
    var reminders = new Array(9)
}

// Get current time and update html
// Line below for testing colors 
// var hour = 13
var hour = moment().format("HH");
var m = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").text(m.toString())
function updateTime() {
    let m = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").text(m.toString())
}

setInterval(updateTime, 1000)

// Sets background colors accordingly based on time

var screens = $(".screen")
for (let index = 0; index < screens.length; index++) {
    let h = parseInt(screens[index].dataset.time)
    if (h < hour) {
        $(screens[index]).addClass("past")
    }
    else if (h > hour) {
        $(screens[index]).addClass("future")
    }
    else if (h === hour) {
        $(screens[index]).addClass("present")
    }
}

// Saves data and updates html with reminders

$(".saveBtn").click(saveData)

function saveData(e) {
    e.preventDefault()
    // Goes through parent elements of clicked button to get the value, and text area to append to
    let thisValue = $(this)[0].form.elements[0].value
    let thisParents = $(this).parents()
    // TimeInt with time parse gives us a corresponding place in our reminders array for each element
    let timeInt = parseInt(thisParents[2].dataset.time)
    let timeFixed = timeInt - 9
    let thisList = thisParents[2].childNodes[3].childNodes[1].children[0]
    // Prevents users from adding empty reminders
    if (thisValue === "") {
        alert("Enter info to save a reminder")
    }
    else {
        // Appends value from textarea to emptyCol, clears text area, then splices the reminder into the array and then saves the array to local storage
        $(thisList).append("<li>" + thisValue + "</li>")
        var listText = $(thisList).text()
        let thisForm = $(this)[0].form
        $(thisForm).trigger("reset")
        reminders.splice(timeFixed, 1, thisValue)
        localStorage.setItem("reminders", JSON.stringify(reminders))
    }
}

// Clear button clears storage and text areas

$("#clear-btn").click(function () {
    $(".emptyCol").empty()
    localStorage.clear()
    location.reload()
})

// CSS Analog Clock By: JWardee 
// Source:https://codepen.io/JWardee/pen/XmMvGK

function updateClock() {
    let now = moment(),
        second = now.seconds() * 6,
        minute = now.minutes() * 6 + second / 60,
        hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

    $('#hour').css("transform", "rotate(" + hour + "deg)");
    $('#minute').css("transform", "rotate(" + minute + "deg)");
    $('#second').css("transform", "rotate(" + second + "deg)");
}

function timedUpdate() {
    updateClock();
    setTimeout(timedUpdate, 1000);
}

timedUpdate();
