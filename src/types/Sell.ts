export interface SellCreate {
    client_email: string
    studio_id?: string
    price: number
    start_time: string
    actual_session?: number
    scheduled_time?: string
    description?: string
    finished?: boolean
}