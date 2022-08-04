async function getIp() {
    let response = await fetch('https://api.ipify.org/?format=json')
    response = await response.json()
    return response.ip;
}

async function handleUserIp() {
    const ip = await this.getIp();
    console.log(ip)
    document.getElementById("ip_final").innerText = ip;
    
    return ip;
}



handleUserIp();