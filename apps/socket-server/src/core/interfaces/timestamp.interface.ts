export interface ITimestamp {
    /**
     * The timestamp of the creation of the object
     */
    createdAt: Date
    /**
     * The timestamp of the last update of the object
     */
    updatedAt: Date
    /**
     * Update the timestamp
     */
    update(): void
    /**
     * The age of the object
     */
    readonly age: number
    /**
     * The age of the object since the last update
     */
    readonly updateAge: number
}
