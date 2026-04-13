# Animation Recipes

Ready-to-use Python snippets for common animation effects via MCP. Each recipe assumes the object exists and uses Blender 5.x API.

## Table of Contents

- [Slide-in from off-screen](#slide-in)
- [Bounce on arrival](#bounce)
- [Spin (N rotations)](#spin)
- [Wobble / shake](#wobble)
- [Ease-to-stop](#ease-to-stop)
- [Camera orbit](#camera-orbit)
- [Shift existing keyframes](#shift-keyframes)
- [Combine: slide-in + bounce + spin](#combo)

---

## Slide-in

Object enters from off-screen right, decelerates to target position.

```python
import bpy

obj = bpy.data.objects['MyObject']
target_x = 0.0  # Final X position

# Frame 1: off-screen
obj.location.x = 3.0
obj.keyframe_insert(data_path='location', index=0, frame=1)

# Frame 20: arrive at target (ease-out via Bezier)
obj.location.x = target_x
obj.keyframe_insert(data_path='location', index=0, frame=20)

# Set Bezier easing
action = obj.animation_data.action
for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        if fc.data_path == 'location' and fc.array_index == 0:
            for kp in fc.keyframe_points:
                kp.interpolation = 'BEZIER'
                kp.handle_right_type = 'AUTO_CLAMPED'
                kp.handle_left_type = 'AUTO_CLAMPED'
            fc.update()
```

## Bounce

Damped bounce after impact. Simulates 3 bounces with decreasing amplitude.

```python
import bpy

obj = bpy.data.objects['MyObject']
base_y = 0.0  # Ground level
amplitudes = [0.5, 0.2, 0.08]  # Decreasing bounce heights
frame = 20  # Start bounce at frame 20

for i, amp in enumerate(amplitudes):
    # Up
    obj.location.y = base_y + amp
    obj.keyframe_insert(data_path='location', index=1, frame=frame + 4)
    # Down
    obj.location.y = base_y
    obj.keyframe_insert(data_path='location', index=1, frame=frame + 8)
    frame += 8

# Set handles for snappy bounce feel
action = obj.animation_data.action
for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        if fc.data_path == 'location' and fc.array_index == 1:
            for kp in fc.keyframe_points:
                kp.interpolation = 'BEZIER'
                kp.handle_left_type = 'AUTO_CLAMPED'
                kp.handle_right_type = 'AUTO_CLAMPED'
            fc.update()
```

## Spin

N full rotations around an axis with progressive deceleration.

```python
import bpy
import math

obj = bpy.data.objects['MyObject']
axis = 2        # 0=X, 1=Y, 2=Z
n_turns = 3     # Number of full rotations
start_frame = 20
end_frame = 55
n_steps = 12    # Keyframes for smooth curve

start_rot = obj.rotation_euler[axis]

for i in range(n_steps + 1):
    t = i / n_steps
    # Ease-out: fast start, slow end
    eased_t = 1 - (1 - t) ** 3
    angle = start_rot + eased_t * n_turns * 2 * math.pi
    frame = start_frame + t * (end_frame - start_frame)

    obj.rotation_euler[axis] = angle
    obj.keyframe_insert(data_path='rotation_euler', index=axis, frame=round(frame))

# Bezier handles
action = obj.animation_data.action
for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        if fc.data_path == 'rotation_euler' and fc.array_index == axis:
            for kp in fc.keyframe_points:
                kp.interpolation = 'BEZIER'
                kp.handle_left_type = 'AUTO'
                kp.handle_right_type = 'AUTO'
            fc.update()
```

## Wobble

Quick oscillation around rest position. Useful for post-impact shake.

```python
import bpy
import math

obj = bpy.data.objects['MyObject']
axis = 2          # Z rotation
amplitude = 0.15  # Radians (~8.5 degrees)
frequency = 3     # Oscillations
damping = 4.0     # How fast it decays
start_frame = 20
duration = 30     # Frames

rest_value = obj.rotation_euler[axis]
n_steps = frequency * 4  # 4 keyframes per cycle

for i in range(n_steps + 1):
    t = i / n_steps
    frame = start_frame + t * duration
    decay = math.exp(-damping * t)
    offset = amplitude * decay * math.sin(2 * math.pi * frequency * t)

    obj.rotation_euler[axis] = rest_value + offset
    obj.keyframe_insert(data_path='rotation_euler', index=axis, frame=round(frame))
```

## Ease-to-stop

Smoothly decelerate any property to its final value. Apply after a fast movement.

```python
import bpy

obj = bpy.data.objects['MyObject']
action = obj.animation_data.action

# Find the last keyframe and set its handles for smooth stop
for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        if fc.data_path == 'location' and fc.array_index == 0:
            last_kp = fc.keyframe_points[-1]
            last_kp.handle_left_type = 'FREE'
            # Extend handle left for long ease-in
            last_kp.handle_left[0] = last_kp.co[0] - 10
            last_kp.handle_left[1] = last_kp.co[1]
            fc.update()
```

## Camera orbit

Camera circles around a center point.

```python
import bpy
import math

cam = bpy.data.objects['Camera']
center = (0, 0, 0)
radius = 5.0
height = 3.0
frames = 120
n_keyframes = 24  # Smooth circle

for i in range(n_keyframes + 1):
    t = i / n_keyframes
    angle = t * 2 * math.pi
    frame = 1 + t * (frames - 1)

    cam.location.x = center[0] + radius * math.cos(angle)
    cam.location.y = center[1] + radius * math.sin(angle)
    cam.location.z = center[2] + height
    cam.keyframe_insert(data_path='location', frame=round(frame))

    # Point camera at center
    direction = (center[0] - cam.location.x, center[1] - cam.location.y, center[2] - cam.location.z)
    cam.rotation_euler = (
        math.atan2(math.sqrt(direction[0]**2 + direction[1]**2), -direction[2]),
        0,
        math.atan2(direction[0], direction[1]) + math.pi
    )
    cam.keyframe_insert(data_path='rotation_euler', frame=round(frame))
```

## Shift keyframes

Move all keyframes of an object by N frames.

```python
import bpy

obj = bpy.data.objects['MyObject']
offset = 60  # Positive = later, negative = earlier
action = obj.animation_data.action

for cb in action.layers[0].strips[0].channelbags:
    for fc in cb.fcurves:
        for kp in fc.keyframe_points:
            kp.co[0] += offset
            kp.handle_left[0] += offset
            kp.handle_right[0] += offset
        fc.update()

print(f"Shifted all keyframes by {offset} frames")
```

## Combo

Combine slide-in + spin + settle. Execute each section as a separate MCP call.

**Call 1**: Slide from X=3 to X=0.5 (frames 1-18)
**Call 2**: Spin Z 2.5 turns with ease-out (frames 18-55)
**Call 3**: Settle X from 0.5 to final (frames 55-60), matching next phase exactly
**Call 4**: Screenshot to verify
**Call 5**: Adjust handles if needed
