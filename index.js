"use strict";
//Global Variables
let peopleDisplay = [];
let sortBy = {};
//Functions
const drawTable = (people) => {
    let tableHTML = `
  <thead>
    <tr>
      <th><button type="button" class="btn btn-link" onclick=sortPeople("name")>Name</button></th>
      <th><button type="button" class="btn btn-link" onclick=sortPeople("birth_year")>DOB</button></th>
      <th><button type="button" class="btn btn-link" onclick=sortPeople("gender")>Gender</button></th>
      <th><button type="button" class="btn btn-link" onclick=sortPeople("url")>URL</button></th>
    </tr>
  </thead>
  <tbody>
  `;
    people.forEach((p) => {
        tableHTML += `<tr><td>${p.name}</td><td>${p.birth_year}</td><td>${p.gender}</td><td>${p.url}</td></tr>`;
    });
    tableHTML += "</tbody>";
    document.querySelector("#tableElement").innerHTML = tableHTML;
};
const paginatePeople = (page) => {
    fetch(`https://swapi.dev/api/people/?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
        peopleDisplay = data.result;
        drawTable(peopleDisplay);
    });
};
const filterPeople = (value) => {
    const filteredPeople = peopleDisplay.filter((p) => p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.birth_year.toLowerCase().includes(value.toLowerCase()) ||
        p.gender.toLowerCase().includes(value.toLowerCase()) ||
        p.url.toLowerCase().includes(value.toLowerCase()));
    drawTable(filteredPeople);
};
const sortPeople = (key) => {
    if (sortBy[key]) {
        if (sortBy[key] === "asc") {
            sortBy[key] = "desc";
        }
        else {
            sortBy[key] = "asc";
        }
    }
    else {
        sortBy = { [key]: "asc" };
    }
    const sortedPeople = peopleDisplay.sort((a, b) => {
        if (sortBy[key] === "asc") {
            //@ts-ignore
            return a[key] > b[key] ? 1 : -1;
        }
        else {
            //@ts-ignore
            return a[key] < b[key] ? 1 : -1;
        }
    });
    drawTable(sortedPeople);
};
const run = () => {
    fetch("https://swapi.dev/api/people/")
        .then((response) => response.json())
        .then((data) => {
        peopleDisplay = data.result;
        const pages = Math.ceil(data.count / 10);
        const paginationElement = document.querySelector("#paginationElemesnt");
        let pagesHTML = "";
        for (let index = 1; index <= pages; index++) {
            pagesHTML += `<li class="page-item"><a class="page-link" href="#" onclick="paginatePeople(${index})">${index}</a></li>`;
        }
        paginationElement.innerHTML = pagesHTML;
        const spinnerElement = document.querySelector("#spinnerContainer");
        spinnerElement.style.display = "none";
    });
};
run();
