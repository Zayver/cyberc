import { ComplaintType } from "@model/constants/complaint-types"

export interface CreateComplaintRequest {
    name: string
    secondName: string
    surName: string
    secondSurName: string
    cellphone: string
    email: string
    cc: string
    description: string
    type: ComplaintType
}