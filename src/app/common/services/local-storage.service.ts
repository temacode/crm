import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class LocalStorageService {
    getValue<T>(key: string): T | null {
        try {
            const value = localStorage.getItem(key);

            return value ? JSON.parse(value) : value;
        } catch (e) {
            console.error("Ошибка локального хранилища");

            return null;
        }
    }

    setValue<T>(key: string, value: T): void {
        try {
            const stringValue = JSON.stringify(value);

            localStorage.setItem(key, stringValue);
        } catch (e) {
            console.error("Ошибка сохранения в локальное хранилище");
        }
    }

    deleteValue(key: string): void {
        try {
            const value = this.getValue<string>(key);

            if (value) {
                localStorage.removeItem(key);
            }
        } catch (e) {
            console.error("Ошибка удаления из локального хранилища");
        }
    }

    setCookie(name: string, value: string, days: number): void {
        let expires = "";

        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

            expires = `; expires=${date.toUTCString()}`;
        }

        document.cookie = `${name}=${value || ""}${expires}; path=/`;
    }

    getCookie(name: string): string | null {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(";");

        for (let i = 0; i < ca.length; i += 1) {
            let c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);

            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }

        return null;
    }

    deleteCookie(name: string): void {
        document.cookie = `${name}=; Max-Age=-99999999;`;
    }
}
