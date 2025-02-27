let d = new Date();

//document.body.innerHTML = "<h1>Today's date is" + d + "</h1>";


const timeElement = document.getElementById("clock");

function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the string with leading zeroes
    const clockStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    timeElement.innerText = clockStr;
    document.body.innerHTML = "<h1>Today's date is" + now + "</h1>";
}

updateTime();
setInterval(updateTime, 1000);