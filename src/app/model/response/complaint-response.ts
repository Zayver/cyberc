import { ComplaintStatus, ComplaintType } from "@model/constants/complaint-types";
import { CreateComplaintRequest } from "@model/request/create-complaint";

export interface ComplaintResponse extends CreateComplaintRequest{
    id: string
    type: ComplaintType
    status: ComplaintStatus
    
}