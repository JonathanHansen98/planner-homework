var m = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").text(m.toString())

function updateTime() {
    let m = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").text(m.toString())
}

setInterval(updateTime, 1000)
