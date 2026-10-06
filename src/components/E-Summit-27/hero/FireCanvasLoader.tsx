"use client";

import dynamic from "next/dynamic";
import type { FireCanvasProps } from "./FireCanvas";

// Next 16: ssr:false dynamic imports must live in a Client Component.
// three.js is only downloaded when this component actually renders (after idle).
const FireCanvas = dynamic(() => import("./FireCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function FireCanvasLoader(props: FireCanvasProps) {
  return <FireCanvas {...props} />;
}