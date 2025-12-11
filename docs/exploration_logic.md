HOLE_RADIUS (default 12)

Bigger = he will hunt stray tiles in a larger zone before expanding.

Smaller = he only cares about local gaps; further ones wait.

Hole neighbor threshold (exploredNeighbors >= 2)

Lower to 1 → super aggressive gap fixing (could look very “polished”).

Raise to 3 → only fill really enclosed holes first.

LOCAL_RADIUS (default 4)

Bigger = larger “chunk” around the player gets cleared before roaming.

Smaller = more wandering arms, less strict territory clearing.
