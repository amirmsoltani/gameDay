import { capitalizeProvider } from '@/utils/helper/providers';
import { GenderType } from 'src/@types/util.type';

export const GenderOption: Array<{ option: string; value: GenderType }> = [
    {
        option: 'male',
        value: 'MALE'
    },
    {
        option: 'female',
        value: 'FEMALE'
    }
];

export const HOUR_OPTIONS = Array.from(Array(13), (_, i) => i).map((hour) => ({
    option: hour,
    value: hour
}));

export const MIN_OPTIONS = [0, 15, 30, 45].map((min) => ({ option: min, value: min }));

export const LANGUAGES_OPTIONS = [
    { value: 'en', optionName: 'English' },
    { value: 'curdi', optionName: 'کوردی' },
    { value: 'ar', optionName: 'العربية' }
];

export const OperatorRoleConst = [
    'ADMIN',
    'PATIENT',
    'DOCTOR',
    'DENTIST',
    'HOSPITAL_CLINIC',
    'LABORATORY',
    'NUTRITION_EXPERT',
    'VETERINARIAN',
    'PHARMACY',
    'MEDICAL_BEAUTY_CENTER'
] as const;

export const OperationOptions = OperatorRoleConst.map((role) => ({
    option: capitalizeProvider(role),
    value: role
}));
