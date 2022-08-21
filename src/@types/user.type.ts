import { FavoriteExercises, Gender, Memberships, Requests, Routines } from 'src/graphql/generated';
import { ResStatusType } from './graphql.type';
// import { ProviderType } from './provider';
import { GenderType, LanguageType, CollectionSegmentInfo } from './util.type';

export type ProviderNameType =
    | 'USER'
    | 'DOCTOR'
    | 'CLINIC'
    | 'HOSPITAL'
    | 'LAB'
    | 'PHARMACY'
    | 'DENTIST'
    | 'MEDICAL_BEAUTY_CENTER'
    | 'VETERINARIAN'
    | 'NUTRITION_EXPERT'
    | 'HOME_SERVICE'
    | 'AMBULANCE';

export type UserType = {
    id: number;
    email?: String;
    fullName?: String;
    phoneNumber?: String;
    userType: UserTypes;
    language?: string;
    address?: String;
    gender: Gender;
    occupation?: String;
    city?: String;
    state?: String;
    zipCide?: String;
    yearsOfExperience?: Number;
    favoriteExercises?: FavoriteExercises[];
    memberships?: Memberships[];
    requests?: Requests[];
    routines?: Routines[];
    // notifications?: [Notification];
    externalId?: String;
    createdDate: Date;
    lastModifiedDate: Date;
    isDeleted: Boolean;
};

export type LoginType = 'GOOGLE' | 'FACE_BOOK';

export type UserTypes = 'ADMIN' | 'NORMAL_USER';

export type ResponseBaseOfUser = {
    result: UserType;
    status: ResStatusType;
};
export type UserCollectionSegment = {
    items: Array<UserType>;
    pageInfo: CollectionSegmentInfo;
    totalCount: number;
};
