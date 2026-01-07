const socket = io('http://localhost:8002/admin', {
    transports: ['websocket'],
})

const statusDot = document.getElementById('status-dot')
const connId = document.getElementById('connection-id')
const monitor = document.getElementById('monitor')
const logCountLabel = document.getElementById('log-count')

let count = 0

socket.on('connect', () => {
    statusDot.className = 'dot online'
    connId.textContent = `ID: ${socket.id}`
    addSystemLog('Connected to Admin Namespace')
})

socket.on('disconnect', () => {
    statusDot.className = 'dot offline'
    addSystemLog('Disconnected from server', 'error')
})

// Listen for logs from AdminMonitor
socket.on('log', (payload) => {
    // Expecting payload: { message: string, level?: 'info'|'error'|'warn' }
    if (typeof payload === 'string') {
        updateLog(payload)
    } else {
        updateLog(payload.message, payload.level)
    }
})

function updateLog(message, level = 'info') {
    count++
    const log = document.createElement('div')
    log.className = `log-entry log-${level}`
    
    const time = new Date().toLocaleTimeString([], { hour12: false })
    
    log.innerHTML = `
        <span class="timestamp">[${time}]</span>
        <span class="message">${message}</span>
    `
    
    monitor.appendChild(log)
    logCountLabel.textContent = `${count} entries`
    
    // Auto-scroll
    monitor.scrollTop = monitor.scrollHeight
}

function addSystemLog(msg, level = 'info') {
    updateLog(`>> SYSTEM: ${msg}`, level)
}

function clearLogs() {
    monitor.innerHTML = ''
    count = 0
    logCountLabel.textContent = '0 entries'
}