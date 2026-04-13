# Blender 5.x FCurve API

## Access path

```python
action = obj.animation_data.action
# Blender 5.x layered actions:
strip = action.layers[0].strips[0]
channelbag = strip.channelbags[0]  # attrs: fcurves, groups, rna_type, slot, slot_handle
fcurves = channelbag.fcurves
```

The old `action.fcurves` raises `AttributeError: 'Action' object has no attribute 'fcurves'`.

## Read all FCurves of an object

```python
import bpy, json

obj = bpy.data.objects['MyObject']
action = obj.animation_data.action
results = []

for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        kf_data = [(round(kp.co[0], 1), round(kp.co[1], 4)) for kp in fc.keyframe_points]
        results.append({
            'path': fc.data_path,
            'index': fc.array_index,
            'interpolation': fc.keyframe_points[0].interpolation if len(fc.keyframe_points) > 0 else None,
            'count': len(fc.keyframe_points),
            'first': kf_data[0] if kf_data else None,
            'last': kf_data[-1] if kf_data else None,
        })

print(json.dumps(results, indent=2))
```

## Insert keyframes

```python
import bpy

obj = bpy.data.objects['MyObject']

# Method 1: via object API (auto-creates action if needed)
obj.location = (1.0, 0.0, 0.0)
obj.keyframe_insert(data_path='location', index=0, frame=1)  # index=0 → X

obj.location = (0.0, 0.0, 0.0)
obj.keyframe_insert(data_path='location', index=0, frame=60)

# Method 2: direct fcurve manipulation (action must exist)
action = obj.animation_data.action
for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        if fc.data_path == 'location' and fc.array_index == 0:
            fc.keyframe_points.insert(frame=30, value=0.5)
```

## Modify existing keyframes

```python
action = obj.animation_data.action
for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        if fc.data_path == 'rotation_euler' and fc.array_index == 2:
            for kp in fc.keyframe_points:
                kp.co[1] += 3.14159  # Add pi to Z rotation
                kp.handle_left[1] += 3.14159   # Update handles too
                kp.handle_right[1] += 3.14159
            fc.update()
```

## Shift all keyframes in time

```python
import bpy

obj = bpy.data.objects['MyObject']
action = obj.animation_data.action
offset = 60  # Shift by 60 frames

for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        for kp in fc.keyframe_points:
            kp.co[0] += offset
            kp.handle_left[0] += offset
            kp.handle_right[0] += offset
        fc.update()
```

## Set interpolation type

```python
# Types: 'CONSTANT', 'LINEAR', 'BEZIER'
for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = 'BEZIER'
            kp.handle_left_type = 'AUTO_CLAMPED'
            kp.handle_right_type = 'AUTO_CLAMPED'
        fc.update()
```

## Handle types reference

| Type | Behavior |
|------|----------|
| `FREE` | Fully manual control |
| `ALIGNED` | Handles stay collinear |
| `VECTOR` | Points toward adjacent keyframe |
| `AUTO` | Automatic smooth |
| `AUTO_CLAMPED` | Auto but no overshoot |

## Delete keyframes at specific frames

```python
for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        # Remove keyframes at frames > 120
        to_remove = [kp for kp in fc.keyframe_points if kp.co[0] > 120]
        for kp in reversed(to_remove):
            fc.keyframe_points.remove(kp)
        fc.update()
```

## Check rotation mode

```python
obj = bpy.data.objects['MyObject']
print(f"Rotation mode: {obj.rotation_mode}")
# 'XYZ', 'XZY', 'YXZ', 'YZX', 'ZXY', 'ZYX' → Euler
# 'QUATERNION' → use rotation_quaternion (4 channels: W, X, Y, Z)
# 'AXIS_ANGLE' → use rotation_axis_angle
```

## Common data_path values

| data_path | Channels | Description |
|-----------|----------|-------------|
| `location` | 0=X, 1=Y, 2=Z | Position |
| `rotation_euler` | 0=X, 1=Y, 2=Z | Euler rotation (radians) |
| `rotation_quaternion` | 0=W, 1=X, 2=Y, 3=Z | Quaternion rotation |
| `scale` | 0=X, 1=Y, 2=Z | Scale |
