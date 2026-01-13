import { Timestamp } from '@/core/utils'
import { IRoomStateManager } from '@/core/interfaces/room.interface'

import { RoomState } from './roomState'

export class RoomStateManager implements IRoomStateManager {
    constructor(
        private _currentState: RoomState,
        private _timestamp: Timestamp,
    ) {}

    get current(): RoomState {
        return this._currentState
    }

    get updatedAt(): number {
        return this._timestamp.updateAge
    }

    touch(): void {
        this._timestamp.update()
    }

    get timestamp(): Timestamp {
        return this._timestamp
    }

    set(state: RoomState): void {
        this._currentState = state
        this._timestamp.update()
    }

    reset(): void {
        this._currentState = RoomState.IDLE
        this._timestamp.update()
    }
}
