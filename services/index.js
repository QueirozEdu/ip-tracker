var map = L.map('map')

async function getIp() {
    let response = await fetch('https://api.ipify.org/?format=json')
    response = await response.json()
    return response.ip;
}

async function handleUserIp() {
    const ip = await this.getIp();
    // console.log(ip)
    document.getElementById("ip_final").innerText = ip;

   
    doSearch();

    return ip;
}

async function locateIp() {
    let ipUrl = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_5FgIKynfFiC4oIrWhRgEzEbHfaTvu&ipAddress='.concat(await handleUserIp());
    let response = await fetch(ipUrl)
    response = await response.json()
    return response;
}

async function doSearch() {
    let ipToSearch = document.getElementById('ip_input').value;
    console.log(ipToSearch);
    let ipUrl = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_8yaIan7ed8aF9tChnm3DZ4BxLFe61&ipAddress='.concat(ipToSearch);
    console.log(ipUrl);
    response = await fetch(ipUrl);
    response = await response.json();
    document.getElementById('ip_final').innerText = response.ip;
    document.getElementById('address_line_1').innerText = await response.location["region"];
    document.getElementById('address_line_2').innerText = await response.location["city"];
    document.getElementById('timezone_final').innerText = await response.location["timezone"];
    document.getElementById('isp_final').innerText = await response.isp;

    let la = await response.location["lat"];
    let lo = await response.location["lng"];
    


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    function mapSetView() {

        map.setView([la, lo], 13);
        var marker = L.marker([la, lo]).addTo(map);
    }
    mapSetView();

    return response;
}


handleUserIp();

locateIp();






const searchInput = document.getElementById("ip_input")
searchInput.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("go_button").click();
    }
});


