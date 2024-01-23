import { Filters } from "@/models/criteria.model";
import { Address } from "./address.model";
import { SlugDto } from "./baseDto.models";
export class User extends SlugDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    address: Address;
    sex: string;
    profession: string;
    presentation: string;
    avatar?: string;
    status?: string;
    customizations?: string;

    constructor(obj: any) {
        super(obj);
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.phone = obj.phone;
        this.age = obj.age;
        this.address = obj?.address;
        this.sex = obj?.sex;
        this.profession = obj?.profession;
        this.presentation = obj?.presentation;
        this.avatar = obj?.avatar;
        this.status = obj?.status;
        this.customizations = JSON.parse(obj?.customizations || '{}');
    }

    public static getUserAddress(user: User) {
        const address = user?.address;
        return address?.city + ', ' + address?.province + ', ' + address?.nation;
    }
}

export class UserQ extends Filters {
    static id = 'id';
    static email = 'email';
    static firstName = 'firstName';
    static lastName = 'lastName';
    static age = 'age';
    static sex = 'sex';
    static nationality = 'nationality';
    static nation = 'nation';
    static province = 'province';
    static city = 'city';
    static cap = 'cap';
    static address = 'address';
    static profession = 'profession';
    static slug = 'slug';
    static createdAt = 'createdAt';
    static updatedAt = 'updatedAt';
}