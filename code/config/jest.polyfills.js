/* globals jest */
// Javascript language features polyfill
import "core-js";

// Fetch polyfill
import "isomorphic-fetch";

// Intersection observer polyfill
import "intersection-observer";

// async/await polyfill
import "regenerator-runtime/runtime";

// Required for some tests
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en";
import "@formatjs/intl-numberformat/locale-data/es";

// Resize observer polyfill
import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";

if (typeof window !== "undefined") {
  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserverPolyfill;
  }
}

if (typeof Element !== "undefined") {
  Element.prototype.scrollIntoView = jest.fn();
}
