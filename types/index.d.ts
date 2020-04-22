declare module 'czares' {
    export interface AddressFull {
        street: string;
        number: string;
        city: string;
        postNumber: string;
    }

    export interface StandardSubject {
        idNumber: string;
        name: string;
        address: AddressFull;
        isVAT: boolean;
        taxIdNumber: string;
    }

    export interface ESSubject {
        idNumber: string;
        name: string;
        addressSimple: string;
        isVAT: boolean;
        taxIdNumber: string;
    }

    export class CZAres {
        getByIdentificationNumber(ico: string): Promise<StandardSubject>;

        getTaxIdNumber(ico: string): Promise<string>;

        isVATRegistered(ico: string): Promise<boolean>;
    }
}