export enum ComplaintType{
    AGAINST_PERSON,
    AGAINST_PROPERTY,
    SEXUAL,
    FINANCIAL,
    CYBERNETIC,
    AGAINST_PUBLIC_HEALTH,
    AGAINST_STATE
}

export const complainTypes = [
    {value: ComplaintType.AGAINST_PERSON, display: 'Delitos contra la persona', icon: 'lucideFileUser'},
    {value: ComplaintType.AGAINST_PROPERTY, display: 'Delitos contra la propiedad', icon: 'lucideLandPlot'},
    {value: ComplaintType.SEXUAL, display: 'Delitos sexuales', icon: 'lucideUsersRound'},
    {value: ComplaintType.FINANCIAL, display: 'Delitos financieros', icon: 'lucideChartArea'},
    {value: ComplaintType.CYBERNETIC, display: 'Delitos cibernéticos', icon: 'lucideComputer'},
    {value: ComplaintType.AGAINST_PUBLIC_HEALTH, display: 'Delitos contra la salud pública', icon: 'lucideAmbulance'},
    {value: ComplaintType.AGAINST_STATE, display: 'Delitos contra el estado', icon: 'lucideLandmark'},
]