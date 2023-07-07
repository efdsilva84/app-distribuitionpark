import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'mylist';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private _storage: Storage | null = null;


  constructor(private storage: Storage) {
      this.criarArmazenamento();
  }

   async criarArmazenamento() {
    // If using, define drivers here: await this.storage.defineDriver(/.../);
    const storage = await this.storage.create();
    console.log(storage);
    this._storage = storage;
    console.log(this._storage);
  }

  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }
  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }
  public async remove(key: string): Promise<any> {
    return await  this._storage?.remove(key);
  }
}
