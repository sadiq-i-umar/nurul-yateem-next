export interface PersonalInformation {
    image: { url: string | null; file?: any },
    gender: string | null, 
    dob: string | undefined, 
    maritalStatus: string | null, 
    phone: string | null, 
    altPhone: string | null,
    homeAddress: string | null,
    stateOfOrigin: string | null,
    lga: string | null
}

export interface Occupation {
    employmentStatus: string | null,
    natureOfJob: string | null,
    annualIncome: string | null,
    employerName: string | null,
    employerPhone: string | null,
    employerAddress: string | null
}

export interface Identity {
    meansOfIdentification: string | null,
    identificationNumber: string | null,
}