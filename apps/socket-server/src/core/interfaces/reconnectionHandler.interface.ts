export interface IReconnectionHandler {
    /**
     * Handle player disconnection
     * @param playerId
     */
    handleDisconnect(playerId: string, onExpiry: () => void): void

    /**
     * Handle player reconnection
     * @param playerId
     */
    handleReconnect(playerId: string): boolean
}
