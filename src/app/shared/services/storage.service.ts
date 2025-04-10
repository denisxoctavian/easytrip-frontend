import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class StorageService {
    save(key: string, data: any): void {
      localStorage.setItem(key, JSON.stringify(data));
    }
  
    load(key: string): any {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }

    delete(key:string){
        localStorage.removeItem(key);
    }
  }