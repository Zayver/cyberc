export enum ComplaintType{
    AGAINST_PERSON,
    AGAINST_PROPERTY,
    SEXUAL,
    FINANCIAL,
    CYBERNETIC,
    AGAINST_PUBLIC_HEALTH,
    AGAINST_STATE
}

export const complainTypes:  { [key in ComplaintType]: {display: string, icon:string} } = {
    [ComplaintType.AGAINST_PERSON]: {display: 'Delitos contra la persona', icon: 'lucideFileUser'},
    [ComplaintType.AGAINST_PROPERTY]: {display: 'Delitos contra la propiedad', icon: 'lucideLandPlot'},
    [ComplaintType.SEXUAL]: {display: 'Delitos sexuales', icon: 'lucideUsersRound'},
    [ComplaintType.FINANCIAL]: {display: 'Delitos financieros', icon: 'lucideChartArea'},
    [ComplaintType.CYBERNETIC]: {display: 'Delitos cibernéticos', icon: 'lucideComputer'},
    [ComplaintType.AGAINST_PUBLIC_HEALTH]: {display: 'Delitos contra la salud pública', icon: 'lucideAmbulance'},
    [ComplaintType.AGAINST_STATE]: {display: 'Delitos contra el estado', icon: 'lucideLandmark'},
}

export enum ComplaintStatus{
    CREATED,
    IN_PROCESS,
    FINALIZED,
}

export const complainStatus:  { [key in ComplaintStatus]: {display: string, icon:string, class: string} } = {
    [ComplaintStatus.CREATED]: {display: 'Creado', icon: 'lucideBadgePlus', class: 'created'},
    [ComplaintStatus.IN_PROCESS]: {display: 'En proceso', icon: 'lucideNotebookPen', class: 'in-process'},
    [ComplaintStatus.FINALIZED]: {display: 'Finalizado', icon: 'lucideBookmarkCheck', class: 'finalized'},
}