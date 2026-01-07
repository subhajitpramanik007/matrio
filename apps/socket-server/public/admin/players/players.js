
async function getAllPlayers() {
    const response = await fetch('/admin/players')
    const data = await response.json()
    return data
}

getAllPlayers().then((data) => console.log(data))
    