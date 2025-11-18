export class Timestamp {
    createdAt: Date
    updatedAt: Date

    constructor() {
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }

    update() {
        this.updatedAt = new Date()
    }

    /**
     * Returns the age of updated time
     * - Difference between current time and updated time
     * - @returns {number}
     */
    get updateAge(): number {
        const age = Date.now() - this.updatedAt.getTime()
        return age
    }

    /**
     * Returns the age of created time
     * - Difference between current time and created time
     * - @returns {number}
     */
    get age(): number {
        const age = Date.now() - this.createdAt.getTime()
        return age
    }
}
