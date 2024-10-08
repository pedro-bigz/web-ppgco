import _get from "lodash/get";
import _omit from "lodash/omit";
import { Filters } from "./useFilters";
import { GenericFunction } from "utils";

export const DEFAULT_STORAGE_KEY = "ppgco-listing-filter";

export class FilterStorage {
  constructor(private storage: any, private storageKey?: string) {}

  public getStorageKey() {
    return this.storageKey ?? DEFAULT_STORAGE_KEY;
  }

  public getAll() {
    try {
      const item = this.storage.getItem(this.getStorageKey());
      return item ? JSON.parse(item) : {};
    } catch (e) {
      return {};
    }
  }

  public get(pathname: string) {
    return _get(this.getAll(), pathname, {});
  }

  public set(filters: Filters) {
    this.storage.setItem(this.getStorageKey(), JSON.stringify(filters));
  }

  public append(pathname: string, filters: Filters) {
    const item = this.getAll();
    this.set({ ...item, [pathname]: { ...item[pathname], ...filters } });
  }

  public replace(pathname: string, filters: Filters) {
    this.set({ ...this.getAll(), [pathname]: filters });
  }

  public reset(pathname: string) {
    this.set(_omit(this.getAll(), pathname));
  }

  public clear(pathname: string) {
    this.replace(pathname, {});
  }

  private protect(callback: GenericFunction) {
    try {
      callback();

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  public safeAppend(pathname: string, filters: Filters) {
    return this.protect(() => this.append(pathname, filters));
  }

  public safeReplace(pathname: string, filters: Filters) {
    return this.protect(() => this.replace(pathname, filters));
  }

  public safeReset(pathname: string) {
    return this.protect(() => this.reset(pathname));
  }

  public safeClear(pathname: string) {
    return this.safeReplace(pathname, {});
  }
}
