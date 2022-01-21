
const fetchXml = async () => {
    const response = await fetch("/xml/films.xml");
    const data = await response.text();
    if (!response.ok) {
    document.getElementById("xml").append("Fetch error: " + data);
    return;
}

    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const films = Array.from(xml.documentElement.children);
    films.forEach(student => document.getElementById("xml").append(student));
}

const fetchJson = async () => {
    const response = await fetch("/json/films.json");
    const data = await response.text();
    if (!response.ok) {
    document.getElementById("json").append("Fetch error: " + data);
    return;
}

    const films = JSON.parse(data);
    const wrapper = document.createElement("div");
    films.forEach(film => {
    wrapper.innerHTML += `${film.name} - ${film.type} <br>`;
});
    document.getElementById("json").append(wrapper);
}

fetchJson();
fetchXml();