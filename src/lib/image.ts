import type { StaticImageData } from "next/image";

export function getImageSrc(src: string | StaticImageData): string {
  return typeof src === "string" ? src : src.src;
}
