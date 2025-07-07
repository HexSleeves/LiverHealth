import { useEffect } from "react";
import { Platform } from "react-native";

/**
 * Hook to apply accessibility fixes for web platform
 * Addresses issues with Clerk's aria-hidden implementation
 */
export function useAccessibilityFixes() {
  useEffect(() => {
    if (Platform.OS !== "web") return;

    const fixAriaHidden = () => {
      // Find all elements with aria-hidden that contain focusable elements
      const ariaHiddenElements = document.querySelectorAll(
        '[aria-hidden="true"]'
      );

      ariaHiddenElements.forEach((element) => {
        const focusableElements = element.querySelectorAll(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
          // Check if any focusable element is currently focused
          const hasFocusedChild = Array.from(focusableElements).some(
            (el) => el === document.activeElement
          );

          if (hasFocusedChild) {
            // Remove aria-hidden temporarily
            element.removeAttribute("aria-hidden");

            // Add it back when focus leaves
            const handleFocusOut = (event: Event) => {
              const focusEvent = event as FocusEvent;
              if (!element.contains(focusEvent.relatedTarget as Node)) {
                element.setAttribute("aria-hidden", "true");
                element.removeEventListener("focusout", handleFocusOut);
              }
            };

            element.addEventListener("focusout", handleFocusOut);
          }
        }
      });
    };

    // Run the fix on mount and when DOM changes
    fixAriaHidden();

    // Set up a mutation observer to handle dynamic content
    const observer = new MutationObserver(fixAriaHidden);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-hidden"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
