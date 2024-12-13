let AllLocations= [];
let SearchInput=document.getElementById("SearchInput");
async function GetLocation(location) 
{
let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3fe9daaa82594c05bc5153001241012&q=${location}&days=3`)    
let MyData = await response.json();
AllLocations = MyData;
DisplayData();
}
GetLocation("Cairo");
function ShowLocation()
{
  GetLocation(SearchInput.value);
}
function DisplayData()
{
  let CurrentDate=new Date();
  let LocationName=AllLocations.location.name;
  let LocationDegree=AllLocations.current.temp_c
  let LocationText= AllLocations.current.condition.text;
  let LocationIcon= AllLocations.current.condition.icon;

  var content="";

    content=
 `
           <div class="MyCard rounded-1 col-lg-4">
            <div class="CardHeader rounded-1 d-flex justify-content-between">
              <span class="text-white">${CurrentDate.toLocaleString('default' , {weekday:'long'})}</span>
              <span class="text-white">${CurrentDate.getDate()} ${CurrentDate.toLocaleString('default' , {month:'long'})}</span>
            </div>
            <div class="CardBody p-2 text-start">
            <h4 class="text-white">${LocationName}</h4>
            <h1 class="text-white Degree">${LocationDegree}<sup>o</sup>C</h1>
            <img src="https:${LocationIcon}" alt="${LocationText}">
            <p class="text-info">${LocationText}</p>
            <div class="d-flex CardFooter">
            <p><img src="./images/icon-umberella@2x.png" alt="umbrella"> 20%</p>
            <p><img src="./images/icon-wind@2x.png" alt="umbrella">18km/hr</p>
            <p><img src="./images/icon-compass@2x.png" alt="umbrella">East</p>
            </div>
            </div>
          </div>   
 `
 AllLocations.forecast.forecastday.forEach((day,index) => {
  if(index>0)
  {
    if(index==1)
    {
      content+=
      `
    <div class="MyCard-2 col-lg-4 ">
              <div class="CardHeader-2 d-flex justify-content-center">
                <span class="text-white">${new Date(day.date).toLocaleString('default' , {weekday : 'long'})}</span>
              </div>
              <div class="CardBody mt-5 p-2 text-start text-center">
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
              <h1 class="text-white">${day.day.maxtemp_c}<sup>o</sup>C</h1>
              <h6 class="text-white">${day.day.mintemp_c}<sup>o</sup>C</h6>
              <p class="text-info">${day.day.condition.text}</p>
              </div>
            </div>
   `
    }
    else if (index==2)
    {
      content+=
      `
    <div class="MyCard col-lg-4">
              <div class="CardHeader-2 d-flex justify-content-center">
                <span class="text-white">${new Date(day.date).toLocaleString('default' , {weekday : 'long'})}</span>
              </div>
              <div class="CardBody mt-5 p-2 text-start text-center">
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
              <h1 class="text-white">${day.day.maxtemp_c}<sup>o</sup>C</h1>
              <h6 class="text-white">${day.day.mintemp_c}<sup>o</sup>C</h6>
              <p class="text-info">${day.day.condition.text}</p>
              </div>
            </div>
   `
    }
  }
 });

document.getElementById("rowData").innerHTML=content;
}


