import React from "react";

export function lazyWithRetry<T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
): React.LazyExoticComponent<T> {
  return React.lazy(async () => {
    const pageHasBeenReloaded = JSON.parse(
      window.sessionStorage.getItem("aiim_chunk_reloaded") || "false",
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem("aiim_chunk_reloaded", "false");
      return component;
    } catch (error) {
      if (!pageHasBeenReloaded) {
        window.sessionStorage.setItem("aiim_chunk_reloaded", "true");
        window.location.reload();
      }
      throw error;
    }
  });
}