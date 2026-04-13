# GLB Export for Web (Three.js / R3F)

## Export command

```python
import bpy

bpy.ops.export_scene.gltf(
    filepath="/path/to/output.glb",
    export_format='GLB',
    export_animations=True,
    export_bake_animation=True,
    export_animation_mode='ACTIONS',
    export_cameras=True,
    export_apply=False,  # Keep modifiers non-destructive
)
```

## Pre-export checklist

1. **Bake animations** if using constraints, drivers, or NLA strips
2. **Apply scale** on objects if non-uniform (`Ctrl+A > Scale` or `bpy.ops.object.transform_apply(scale=True)`)
3. **Check frame range**: `bpy.context.scene.frame_start` and `frame_end` match animation length
4. **Remove unused actions** to reduce file size
5. **Verify rotation mode** matches what the animation tracks expect

## Coordinate system

- Blender: Z-up, right-handed
- glTF/Three.js: Y-up, right-handed
- The GLTF exporter handles conversion automatically
- Do NOT manually swap axes in code

## Web integration pattern (Three.js)

```typescript
const { scene, animations } = useGLTF('/models/file.glb');

const mixer = new THREE.AnimationMixer(scene);
for (const clip of animations) {
    const action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
}

// Scrub to specific time (scroll-driven)
mixer.setTime(progress * clipDuration);
```

## File size optimization

| Technique | Impact |
|-----------|--------|
| Reduce keyframe count (bake at lower rate) | High |
| Remove unused meshes/materials | Medium |
| Use Draco compression in export | Medium |
| Simplify mesh geometry | High |
| Remove scale tracks (usually constant) | Low |

Target: < 500KB for scroll-driven animations, < 2MB for complex scenes.

## Common export issues

| Issue | Cause | Fix |
|-------|-------|-----|
| No animations in GLB | Actions not linked to objects | Assign actions to object's `animation_data.action` |
| Wrong axis orientation | Manual axis swap in code | Remove manual swap, let exporter handle it |
| Scale mismatch | Non-applied scale | Apply scale before export |
| Missing camera | `export_cameras=False` | Set `export_cameras=True` |
| Animations loop in web | Default action config | Set `LoopOnce` + `clampWhenFinished` in Three.js |

## Verify exported GLB

After export, verify contents with:

```bash
npx gltf-transform inspect path/to/file.glb
```

Check: node names match expectations, animation clip count, total file size.
