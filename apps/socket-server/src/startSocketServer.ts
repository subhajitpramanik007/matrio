import { Server as HttpServer } from 'http'
import { SocketServerFactory } from '@/core/gateway/SocketServerFactory'

export function startSocketServer(httpServer: HttpServer) {
    // create admin namespace
    const admin = SocketServerFactory.CreateAdminNamespace()

    // create store
    SocketServerFactory.CreateStore(admin.monitor)

    // create web socket server
    const webSocketServer = SocketServerFactory.CreateWebSocketServer(httpServer)
    SocketServerFactory.Init(webSocketServer.io)

    // initialize admin namespace
    admin.namespace.init(webSocketServer.io)
    admin.monitor.init(admin.namespace.adminIo)

    // initialize game socket server services
    SocketServerFactory.SetupGameServices()
}
