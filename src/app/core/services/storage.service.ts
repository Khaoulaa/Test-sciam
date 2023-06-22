import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  /**
   * Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs.
   * @param index index of the item to get
   * @returns
   */
  key(index: number): Promise<string | null> {
    return Promise.resolve(localStorage.key(index));
  }

  /**
   * Returns the current value associated with the given key, or null if the given key does not exist.
   * @param key key of the item to get
   * @returns
   */
  get(key: string): Promise<string | null> {
    return Promise.resolve(localStorage.getItem(key));
  }

  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   * @param key key of the item to set
   * @param value value of the item to set
   * @returns
   */
  set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
    return Promise.resolve();
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   * @param key key of the item to remove
   * @returns
   */
  remove(key: string): Promise<void> {
    localStorage.removeItem(key);
    return Promise.resolve();
  }

  /**
   * Removes all key/value pairs, if there are any.
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   * @returns 
   */
  clear(): Promise<void> {
    localStorage.clear();
    return Promise.resolve();
  }
}
