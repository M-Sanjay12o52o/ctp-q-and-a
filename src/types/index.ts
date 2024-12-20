export type User = {
    id: string;
    username: string;
    email: string;
};

export type Question = {
    id: number;
    question: string;
    choices: string[];
    answer?: string;
};

export type FormInput = {
    username: string;
    question: string;
    choices: string[];
    file?: File | null;
};
