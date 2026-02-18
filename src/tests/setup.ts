import "@testing-library/jest-dom";

(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver =
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

window.HTMLElement.prototype.hasPointerCapture = () => false;
window.HTMLElement.prototype.scrollIntoView = () => {};
