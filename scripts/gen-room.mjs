import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const out = "components/three/RoomModel.tsx";

execFileSync(
  "gltfjsx",
  ["public/models/room.glb", "--types", "--keepnames", "--root", "public", "--output", out],
  { stdio: "inherit" },
);

let src = readFileSync(out, "utf8")
  .replace(/^\/\*[\s\S]*?\*\/\s*/, "")
  .replace(/import React from ['"]react['"]\n/, "")
  .replace(
    /import \{ GLTF \} from ['"]three-stdlib['"]/,
    'import type { ThreeElements } from "@react-three/fiber"',
  )
  .replace(/type GLTFResult = GLTF & /, "type GLTFResult = ")
  .replace(/\) as GLTFResult/, ") as unknown as GLTFResult")
  .replace(/JSX\.IntrinsicElements\[['"]group['"]\]/g, 'ThreeElements["group"]')
  .replace(/export function Model\(/, "export function RoomModel(");

if (!/type GLTFAction\b/.test(src)) src = src.replace(/\n\s*animations: GLTFAction\[\]/, "");

writeFileSync(out, `"use client";\n\n${src}`);
execFileSync("prettier", ["--write", out], { stdio: "inherit" });
