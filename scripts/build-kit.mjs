import { readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { Document, NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, prune, quantize, weld } from "@gltf-transform/functions";
import obj2gltf from "obj2gltf";

const SRC = "assets/kenney";
const OUT = "public/models/kit.glb";

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);

const kit = new Document();
const buffer = kit.createBuffer();
const scene = kit.createScene("kit");
const materials = new Map();

for (const file of readdirSync(SRC).filter((f) => f.endsWith(".obj"))) {
  const name = basename(file, ".obj");
  const glb = await obj2gltf(join(SRC, file), { binary: true, unlit: false });
  const part = await io.readBinary(new Uint8Array(glb));

  const root = kit.createNode(name);
  scene.addChild(root);

  for (const srcMesh of part.getRoot().listMeshes()) {
    const mesh = kit.createMesh(name);
    for (const srcPrim of srcMesh.listPrimitives()) {
      const prim = kit.createPrimitive().setMode(srcPrim.getMode());
      for (const semantic of ["POSITION", "NORMAL"]) {
        const a = srcPrim.getAttribute(semantic);
        if (!a) continue;
        prim.setAttribute(
          semantic,
          kit
            .createAccessor()
            .setType(a.getType())
            .setArray(a.getArray().slice())
            .setBuffer(buffer),
        );
      }
      const idx = srcPrim.getIndices();
      if (idx) {
        prim.setIndices(
          kit.createAccessor().setType("SCALAR").setArray(idx.getArray().slice()).setBuffer(buffer),
        );
      }
      const matName = srcPrim.getMaterial()?.getName() || "default";
      if (!materials.has(matName)) {
        const src = srcPrim.getMaterial();
        materials.set(
          matName,
          kit
            .createMaterial(matName)
            .setBaseColorFactor(src?.getBaseColorFactor() ?? [1, 1, 1, 1])
            .setRoughnessFactor(0.85)
            .setMetallicFactor(0),
        );
      }
      prim.setMaterial(materials.get(matName));
      mesh.addPrimitive(prim);
    }
    root.addChild(kit.createNode(`${name}_mesh`).setMesh(mesh));
  }
}

await kit.transform(weld(), dedup(), prune(), quantize());
mkdirSync("public/models", { recursive: true });
writeFileSync(OUT, await io.writeBinary(kit));
console.log(`${OUT}: ${materials.size} materials, ${scene.listChildren().length} models`);
