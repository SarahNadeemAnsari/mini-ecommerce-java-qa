export class TestData {
    username: string;
    email: string;
    password: string;

    constructor(testCaseId: string) {
        this.username = this.generateUsername(testCaseId);
        this.email = this.generateEmail(testCaseId);
        this.password = this.generatePassword();
    }

    private generateRandomString(length: number): string {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    private generateUsername(testCaseId: string): string {
        const random = this.generateRandomString(8);
        return `${testCaseId}_${random}`;
    }

    private generateEmail(testCaseId: string): string {
        const random = this.generateRandomString(8);
        return `${testCaseId}_${random}@${random}.com`;
    }

    private generatePassword(): string {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%^&*';

        const upper = uppercase[Math.floor(Math.random() * uppercase.length)];
        const lower = lowercase[Math.floor(Math.random() * lowercase.length)];
        const number = numbers[Math.floor(Math.random() * numbers.length)];
        const symbol = special[Math.floor(Math.random() * special.length)];

        const random = this.generateRandomString(6 + Math.floor(Math.random() * 6));
        return upper + lower + number + symbol + random;
    }
}