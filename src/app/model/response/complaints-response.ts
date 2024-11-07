import { ComplaintResponse } from "./complaint-response"

export interface ComplaintsResponse{
    complaints: ComplaintResponse[]
    total: number
    hasNext: boolean
}