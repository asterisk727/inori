# General Info:

Argument Types: \
INT: Unsigned integer. \
FP[n]: Float with n decimals of precision after the decimal point. \
NOTE: A note type (for binding AIR-related notes to). \
["string", ...]: An enumeration of values observed to be assignable to this argument.

?: indicates that the purpose of an argument is not well understood.

# File Blocks

- Header
- BPM / Scroll Speed
- Body (Notes)
- Metadata

# Header

VERSION version_0: [] version_1: [] \
MUSIC musicId: INT \
SEQUENCEID ?: [0] \
DIFFICULT ?: [00] / INT \
LEVEL ?: [0.0] / FP1 \
CREATOR name: String \
BPM_DEF BPM_1: FP3 BPM_2: FP3 BPM_3: FP3 BPM_4: FP3 \
MET_DEF met_high: INT met_low: INT \
RESOLUTION ?: [384] / INT \
CLK_DEF ?: [384, 288, ...] / INT \
PROGJUDGE_BPM ?: [240.000] / FP3 \
PROGJUDGE_AER ?: [0.999] / FP3 \
TUTORIAL true: [0, 1]

# BPM / Scroll Speed

## BPM

Of format: \
BPM measure: INT offset: INT BPM: FP3

## MET

Of format: \
MET measure: INT offset: INT met_high: INT met_low: INT

## SLP:

Linearly change the playfield speed across a duration of time.
Seems to be a temporary modification; the playfield speed reverts to 1.000000 when outside the duration of a SLP declaration.
Often in the preamble of the notes block, right after the initial BPM and MET declarations.

Of format: \
SLP measure: INT offset: INT duration: INT speed: FP6 ?: ["0"]

## SFL:

To be researched.

Of format: \
SFL measure: INT offset: INT duration: INT speed: FP6

# Body (Notes)

## TAP-related notes:

### Simple red TAP notes:

Of format: \
TAP measure: INT offset: INT cell: INT width: INT

### Yellow ExTap notes:

Of format: \
CHR measure: INT offset: INT cell: INT width: INT ?: ["UP", "DW", "CE"]

## AIR-related notes:

### Simple up AIR notes not part of an AIR-HOLD:

Of format: \
["AIR", "AUL", "AUR", "ADW", "ADL", "ADR"] measure: INT offset: INT cell: INT width: INT target: NOTE ?: ["DEF"]

Where:
AIR is up, AUL is up left, AUR is up right, ADW is down, ADL is down left, ADR is down right, \
and the AIR direction is cosmetic only, \
and it is uncertain what purpose deliniating the target note serves.

### Movable (NEW~) AIR-HOLD chains:

ASC indicates an AIR-HOLD segment (control point), while ASD indicates the last segment (conclusion) of an AIR-HOLD.

Of format: \
["ASD", "ASC"] measure: INT offset: INT cell_0: INT width_0: INT target: NOTE height_0: FP1 duration: INT cell_1: INT width_1: INT height_1: FP1 ?: ["DEF"]

Where:
[argument]\_0 refers to the parameters at the beginning of the AIR-HOLD segment, \
and [argument]\_1 refers to the paramaters to transform to by the end of the AIR-HOLD segment's duration, \
and target: NOTE refers to the note the AIR-HOLD chain "binds to" at the beginning of that section, which may be either:

- a TAP/CHR note or SLD (slide conclusion) note, which seems to automatically spawn an AIR-UP at the segment offset,
- another ASC note, which continues an AIR-HOLD,
  and ASD notes ending an AIR-HOLD seem to automatically spawn an AIR-ACTION at the segment's conclusion (offset + duration)

### ALD:

ALD indicates a colored line through the playfield, which optionally spawns AIR-CRUSH notes along it at fixed intervals.

Of format:

ALD measure: INT offset: INT cell_0: INT width_0: INT interval: INT height_0: FP1 duration: INT cell_1: INT width_1: INT height_1: FP_1 color: [...]

Where:
[argument]\_0 refers to the parameters at the beginning of the line, \
and [argument]\_1 refers to the parameters to transform to by the end of the line's duration, \
and interval: INT refers to how often (in terms of resolution-ticks) to spawn an AIR-CRUSH along the line (with 0 to spawn none), \
and color: [...] refers to the color of the line (wuth DEF to be transparent)

## Hold notes:

### Orange holds that start with a red TAP:

Of format: \
HLD measure: INT offset: INT cell: INT width: INT duration: INT

Where: \
duration uses the same resolution-based timekeeping as offset.

### Holds that start with a yellow ExTap:

Follows the above rules but substitutes HLD for HXD,
and has an additional argument ?: ["UP" (?), "DW" (?), "CE"] appended.

## Slides:

### Blue slides that start with a red TAP:

SLC indicates a slide segment (control point), while SLD indicates the last segment (conclusion) of a slide.

Of format: \
["SLD", "SLC"] measure: INT offset: INT cell_0: INT width_0: INT duration: INT cell_1: INT width_1: INT ?: ["SLD"]

Where:
[argument]\_0 refers to the parameters at the beginning of the slide segment, \
and [argument]\_1 refers to the paramaters to transform to by the end of the slide segment's duration.

### Slides that start with a yellow ExTap:

Follows the above rules but substitutes SLD/SLC for SXD/SXC but ONLY for the note type command (?: ["SLD"] is unmodified), \
and has an additional argument ?: ["UP", "DW", "CE"] appended.

## Flick notes:

MASTER >= exclusive flick notes:

Of format: \
FLK measure: INT offset: INT cell: INT width: INT ?: ["L"]

# Metadata

T_REC_TAP ?: INT \
T_REC_CHR ?: INT \
T_REC_FLK ?: INT \
T_REC_MNE ?: INT \
T_REC_HLD ?: INT \
T_REC_SLD ?: INT \
T_REC_AIR ?: INT \
T_REC_AHD ?: INT \
T_REC_ALL ?: INT \
T_NOTE_TAP ?: INT \
T_NOTE_CHR ?: INT \
T_NOTE_FLK ?: INT \
T_NOTE_MNE ?: INT \
T_NOTE_HLD ?: INT \
T_NOTE_SLD ?: INT \
T_NOTE_AIR ?: INT \
T_NOTE_AHD ?: INT \
T_NOTE_ALL ?: INT \
T_NUM_TAP ?: INT \
T_NUM_CHR ?: INT \
T_NUM_FLK ?: INT \
T_NUM_MNE ?: INT \
T_NUM_HLD ?: INT \
T_NUM_SLD ?: INT \
T_NUM_AIR ?: INT \
T_NUM_AHD ?: INT \
T_NUM_AAC ?: INT \
T_CHRTYPE_UP ?: INT \
T_CHRTYPE_DW ?: INT \
T_CHRTYPE_CE ?: INT \
T_CHRTYPE_RC ?: INT \
T_CHRTYPE_LC ?: INT \
T_CHRTYPE_RS ?: INT \
T_CHRTYPE_LS ?: INT \
T_CHRTYPE_BS ?: INT \
T_LEN_HLD ?: INT \
T_LEN_SLD ?: INT \
T_LEN_AHD ?: INT \
T_LEN_ALL ?: INT \
T_JUDGE_TAP ?: INT \
T_JUDGE_HLD ?: INT \
T_JUDGE_SLD ?: INT \
T_JUDGE_AIR ?: INT \
T_JUDGE_FLK ?: INT \
T_JUDGE_ALL ?: INT \
T_FIRST_MSEC ?: INT \
T_FIRST_RES ?: INT \
T_FINAL_MSEC ?: INT \
T_FINAL_RES ?: INT \
T_PROG_00 ?: INT \
T_PROG_05 ?: INT \
T_PROG_10 ?: INT \
T_PROG_15 ?: INT \
T_PROG_20 ?: INT \
T_PROG_25 ?: INT \
T_PROG_30 ?: INT \
T_PROG_35 ?: INT \
T_PROG_40 ?: INT \
T_PROG_45 ?: INT \
T_PROG_50 ?: INT \
T_PROG_55 ?: INT \
T_PROG_60 ?: INT \
T_PROG_65 ?: INT \
T_PROG_70 ?: INT \
T_PROG_75 ?: INT \
T_PROG_80 ?: INT \
T_PROG_85 ?: INT \
T_PROG_90 ?: INT \
T_PROG_95 ?: INT
