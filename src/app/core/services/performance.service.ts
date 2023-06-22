import { Inject, Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';

export interface Memory {
  /** The maximum size of the heap, in bytes, that is available to the context. */
  jsHeapSizeLimit: number;
  /** The maximum size of the heap, formatted, that is available to the context. */
  jsHeapSizeLimitFormatted: string;
  /** The total allocated heap size, in bytes. */
  totalJSHeapSize: number;
  /** The total allocated heap size, formatted. */
  totalJSHeapSizeFormatted: string;
  /** The currently active segment of JS heap, in bytes. */
  usedJSHeapSize: number;
  /** The currently active segment of JS heap, formatted. */
  usedJSHeapSizeFormatted: string;
}

interface Performance {
  memory: Memory;
}

declare const performance: Performance;

@Injectable({ providedIn: 'root' })
export class PerformanceService {

  private _refreshDelay = 1000;

  constructor(
    private _platform: Platform,
    @Inject(DOCUMENT) private _document: Document
  ) {
    if (!this._platform.BLINK) {
      throw new Error(
        'PerformanceService is only available in a BLINK based browser.'
      );
    }
  }

  getMemory(): Observable<Memory> {
    return timer(0, this._refreshDelay).pipe(
      map(() => performance.memory),
      distinctUntilChanged((a, b) => {
        return (
          a.jsHeapSizeLimit === b.jsHeapSizeLimit &&
          a.totalJSHeapSize === b.totalJSHeapSize &&
          a.usedJSHeapSize === b.usedJSHeapSize
        );
      }),
      map((memory) => {
        return {
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          jsHeapSizeLimitFormatted: this._formatBytes(memory.jsHeapSizeLimit),
          totalJSHeapSize: memory.totalJSHeapSize,
          totalJSHeapSizeFormatted: this._formatBytes(memory.totalJSHeapSize),
          usedJSHeapSize: memory.usedJSHeapSize,
          usedJSHeapSizeFormatted: this._formatBytes(memory.usedJSHeapSize),
        };
      })
    );
  }

  /**
   * Return node count
   * @returns Observable<number>
   */
  getNodeCount(): Observable<number> {
    return timer(0, this._refreshDelay).pipe(
      map(() => this._document.querySelectorAll('app-root *').length),
      distinctUntilChanged((a, b) => {
        return a === b;
      })
    );
  }

  private _formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
