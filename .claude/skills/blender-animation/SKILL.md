---
name: blender-animation
description: Craft precise Blender animations via MCP tools (execute_blender_code, get_scene_info, get_viewport_screenshot). Trigger when user asks to animate objects, create keyframe animations, add motion effects (bounce, spin, wobble, orbit), modify existing animations, shift keyframes, or export animated GLB for web. Also trigger on "animate", "keyframe", "easing", "animation Blender", "mouvement", "rebond", "rotation animée".
---

# Blender Animation via MCP

Craft animations in Blender through incremental MCP calls. Each animation is a work of craftsmanship — inspect before modifying, verify visually after each phase, iterate until elegant.

## Workflow

Every animation task follows this sequence:

### 1. Inspect current state

Always start by reading what exists. Never assume.

```python
# Get scene overview
mcp__blender__get_scene_info

# Then read existing animation data for target object
import bpy, json
obj = bpy.data.objects['ObjectName']
if obj.animation_data and obj.animation_data.action:
    action = obj.animation_data.action
    for cb in action.layers[0].strips[0].channelbags:
        for fc in cb.fcurves:
            first = fc.keyframe_points[0].co if len(fc.keyframe_points) > 0 else None
            last = fc.keyframe_points[-1].co if len(fc.keyframe_points) > 0 else None
            print(f"{fc.data_path}[{fc.array_index}]: {len(fc.keyframe_points)} kf, first={first}, last={last}")
```

### 2. Plan phases

Break the animation into discrete phases. Each phase = 1-2 MCP calls max.

Example for a "slide-in + bounce" animation:
- Phase A: Read existing keyframes (1 call)
- Phase B: Create slide-in keyframes (1 call)
- Phase C: Add bounce keyframes (1 call)
- Phase D: Set Bezier handles for easing (1 call)
- Phase E: Screenshot verification (1 call)

### 3. Execute phase by phase

One concept per `execute_blender_code` call. Keep scripts under 40 lines.

After each structural phase, take a screenshot:
```
mcp__blender__get_viewport_screenshot
```

### 4. Verify continuity

At phase boundaries, ensure values match exactly:
```python
# Frame 60 (end of phase A) must equal frame 61 (start of phase B)
# Check: position, rotation, scale values are identical
```

### 5. Export if needed

See [references/glb-export-web.md](references/glb-export-web.md) for GLB export checklist.

## Blender 5.x FCurve Access (CRITICAL)

**`action.fcurves` does NOT exist in Blender 5.x.** Use the layered action API:

```python
action = obj.animation_data.action
fcurves = action.layers[0].strips[0].channelbags[0].fcurves
```

See [references/blender5-fcurve-api.md](references/blender5-fcurve-api.md) for complete API patterns.

## Animation Recipes

Ready-to-use code for common effects: bounce, spin, wobble, orbit camera, slide-in, shake, ease-to-stop.

See [references/animation-recipes.md](references/animation-recipes.md).

## Key Principles

- **Bezier handles**: Always update `handle_left` and `handle_right` when modifying keyframe values
- **Axis independence**: Keep rotation axes separate (spin on Z independent from rotation on Y)
- **Easing selection**: Ease-out for deceleration, bounce for impact, ease-in-out cubic for smooth transitions
- **Scrub-friendly**: Use Bezier interpolation (not Linear) for scroll-driven web animations
- **Rotation mode**: Check `obj.rotation_mode` before assuming Euler vs Quaternion

## Anti-patterns

- Using `action.fcurves` directly (crashes Blender 5.x)
- Modifying keyframes without reading existing values first
- Sending scripts longer than 50 lines in one MCP call
- Forgetting to update Bezier handles after changing keyframe values
- Assuming axis orientation without checking rotation_mode
- Skipping screenshot verification between phases
