import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalStorageService {
    getValue<T>(key: string): T | null {
        try {
            const value = localStorage.getItem(key);

            return value ? JSON.parse(value) : value;
        } catch (e) {
            console.error('Ошибка локального хранилища');

            return null;
        }
    }

    setValue<T>(key: string, value: T): void {
        try {
            const stringValue = JSON.stringify(value);

            localStorage.setItem(key, stringValue);
        } catch (e) {
            console.error('Ошибка сохранения в локальное хранилище');
        }
    }

    deleteValue(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Ошибка удаления из локального хранилища');
        }
    }
}
