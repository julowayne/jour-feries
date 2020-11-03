dayjs().format();

let today = dayjs().format("YYYY-MM-DD");
let now = document.getElementById('today');

now.innerHTML = `Nous sommes le : ${today}`;



axios
.get("https://calendrier.api.gouv.fr/jours-feries/metropole/2020.json")
.then((dates) => {
    let forecastHoliday = JSON.parse(JSON.stringify(dates.data));
    let work = false;
    let today = dayjs().format("YYYY-MM-DD");
    for(item in dates){
        if(today === dates) {
            work = true;
            break;
        }
    }
    if(work === true) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        div.className = "alert alert-sucess shadow-sm";
        div.innerHTML = `GRASSE MATINEE 😇`;
        let now = document.querySelector("#today");
        now.append(div);
    }
    else {
        let div = document.createElement('div');
        div.className = "alert alert-danger shadow-sm";
        div.innerHTML = `VA BOSSER 😡 !`;
        let now = document.querySelector("#today");
        now.append(div);
    }
    for(item in forecastHoliday){
        let holiday = dayjs(item).format("YYYY-MM-DD");
        if(today > holiday){
            delete forecastHoliday[item];
        }
        else {
            let li = document.createElement("li");
            li.className = "list-unstyled";
            li.innerHTML = `${forecastHoliday[item]} (${item})`;
            let forecast = document.querySelector("#next");
            forecast.append(li);
        }
    }
    console.log(forecastHoliday);
})
.catch((error) => {
    console.log(error);
});


let displayList = false;
function display() {
    var x = document.getElementById("list");
    if(displayList === false){
        displayList = true;
        x.style.display = "block";
    }
    else {
        displayList = false;
        x.style.display = "none";
    }
}

let button = document.querySelector("#display");
button.addEventListener('click', (e) => {
    e.preventDefault();
    axios
    .get("https://calendrier.api.gouv.fr/jours-feries/metropole/2021.json")
    .then((dates) => {
        for(item in dates.data){ 
            let div = document.createElement("div");
            div.innerHTML = `${dates.data[item]} (${item})`;
            let list = document.querySelector("#list");
            list.append(div);
            }
        })
    .catch((error) => {
    console.log(error);
    });

});
