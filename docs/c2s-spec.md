Notes to self:
ONLY DO NEW~ CHARTS FOR NOW DONT MAKE IT MORE CONFUSING AGHHH
Check charts with taps that come down and back up from an air hold
Check charts with air-actions not at the end of an air hold
More air-crush note charts (maybe ultimate force MAS)
speaking of ultimate force mas...
see how the air-actions are spawned in measures 64-79
see how the air-crushes are spawned in measures 113/117, 129, 138-145, 158-159, 163-165

General Info:

Argument Types:
INT: Unsigned integer.
FP[n]: Float with n decimals of precision after the decimal point.
NOTE: A note type (for binding AIR-related notes to).
["string", ...]: An enumeration of values observed to be assignable to this argument.

?: indicates that the purpose of an argument is not well understood.

# TAP-related notes:

## Simple red TAP notes:

Of format:
TAP measure: INT offset: INT cell: INT width: INT

## Yellow ExTap notes:

Of format:
CHR measure: INT offset: INT cell: INT width: INT ?: ["UP", "DW", "CE"]

# AIR-related notes:

## Simple up AIR notes not part of an AIR-HOLD:

Of format:
["AIR", "AUL", "AUR", "ADW", "ADL", "ADR"] measure: INT offset: INT cell: INT width: INT target: NOTE ?: ["DEF"]
Where:
AIR is up, AUL is up left, AUR is up right, ADW is down, ADL is down left, ADR is down right,
and the AIR direction is cosmetic only,
and it is uncertain what purpose deliniating the target note serves.

## Movable (NEW~) AIR-HOLD chains:

ASC indicates an AIR-HOLD segment (control point), while ASD indicates the last segment (conclusion) of an AIR-HOLD.

Of format:
["ASD", "ASC"] measure: INT offset: INT cell_0: INT width_0: INT target: NOTE height_0: FP1 duration: INT cell_1: INT width_1: INT height_1: FP1 ?: ["DEF"]
Where:
[argument]\_0 refers to the parameters at the beginning of the AIR-HOLD segment,
and [argument]\_1 refers to the paramaters to transform to by the end of the AIR-HOLD segment's duration,
and target: NOTE refers to the note the AIR-HOLD chain "binds to" at the beginning of that section, which may be either:

- a TAP/CHR note or SLD (slide conclusion) note, which seems to automatically spawn an AIR-UP at the segment offset,
- another ASC note, which continues an AIR-HOLD,
  and ASD notes ending an AIR-HOLD seem to automatically spawn an AIR-ACTION at the segment's conclusion (offset + duration)

# Hold notes:

Orange holds that start with a red TAP:

Of format:
HLD measure: INT offset: INT cell: INT width: INT duration: INT
Where:
duration uses the same resolution-based timekeeping as offset.

Holds that start with a yellow ExTap:
Follows the above rules but substitutes HLD for HXD,
and has an additional argument ?: ["UP" (?), "DW" (?), "CE"] appended.

# Slides:

## Blue slides that start with a red TAP:

SLC indicates a slide segment (control point), while SLD indicates the last segment (conclusion) of a slide.

Of format:
["SLD", "SLC"] measure: INT offset: INT cell_0: INT width_0: INT duration: INT cell_1: INT width_1: INT ?: ["SLD"]
Where:
[argument]\_0 refers to the parameters at the beginning of the slide segment,
and [argument]\_1 refers to the paramaters to transform to by the end of the slide segment's duration.

## Slides that start with a yellow ExTap:

Follows the above rules but substitutes SLD/SLC for SXD/SXC but ONLY for the note type command (?: ["SLD"] is unmodified),
and has an additional argument ?: ["UP", "DW", "CE"] appended.

# Flick notes:

MASTER >= exclusive flick notes:

Of format:
FLK measure: INT offset: INT cell: INT width: INT ?: ["L"]

# SLP:

Linearly change the playfield speed across a duration of time.
Seems to be a temporary modification; the playfield speed reverts to 1.000000 when outside the duration of a SLP declaration.
Often in the preamble of the notes block, right after the initial BPM and MET declarations.

Of format:
SLP measure: INT offset: INT duration: INT speed: FP6 ?: ["0"]

ALD:

Of format:
...

cell 0 width 16 count 10 from the bottom
ALD 34 192 0 16 1 2.0 9 0 16 10.0 DEF

cell 0 width 8 count 3 from the bottom and another at cell 8 width 8
ALD 92 288 0 8 1 6.0 2 0 8 3.0 DEF
ALD 92 288 8 8 1 6.0 2 8 8 3.0 DEF

some cosmetic ALDs
ALD 29 0 14 1 0 1.0 576 14 1 1.0 GRY
ALD 29 0 15 1 0 1.0 576 15 1 1.0 GRY
ALD 75 201 7 2 0 1.0 15 8 1 1.0 YEL
ALD 75 216 0 1 0 1.0 16 0 1 1.0 PNK
