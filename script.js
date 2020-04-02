var emptyList = $(".emptyList")
var reminders = JSON.parse(localStorage.getItem("reminders"))

    if (reminders !== null) {
        for (let index = 0; index < emptyList.length; index++) {
            let remInd = (reminders[index])
            if (reminders[index] !== null) {                
                let newListItem = $("<li>")
                $(newListItem).text(remInd)
                $(emptyList[index]).append(newListItem)      
            }
        }
    } else {
     var reminders = new Array(8)   
    }
console.log(emptyList)
// Changes background color based on time
// Get current time and update html

var hour = moment().format("hh");
var m = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").text(m.toString())
function updateTime() {
    let m = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").text(m.toString())
}

setInterval(updateTime, 1000)

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
    let thisValue = $(this)[0].form.elements[0].value
    let thisParents = $(this).parents()
    let timeInt = parseInt(thisParents[2].dataset.time)
    let timeFixed = timeInt - 9 
    console.log(timeFixed)
    let thisList = thisParents[2].childNodes[3].childNodes[1].children[0]
    if (thisValue === "") {
        alert("Enter info to save a reminder")
    }
    else {
        $(thisList).append("<li>" + thisValue + "</li>")
        var listText = $(thisList).text()
        console.log(listText)
        let thisForm = $(this)[0].form
        $(thisForm).trigger("reset")
        reminders.splice(timeFixed, 1, thisValue)
        localStorage.setItem("reminders", JSON.stringify(reminders))
    }
}

