/* Primatives */
export type Integer = number;
export type Float = number;

export interface BarOffset384 {
    bar: Integer;
    offset: Integer;
}

/* Header Block */

export interface C2SVersion {
    version_0: string;
    version_1: string;
}

export interface C2SBPMDef {
    BPM_0: Float;
    BPM_1: Float;
    BPM_2: Float;
    BPM_3: Float;
}

export interface C2SMetDef {
    met_high: Integer;
    met_low: Integer;
}

export interface C2SHeader {
    version: C2SVersion;
    musicId: Integer;
    sequenceId: Integer;
    difficult: Integer;
    level: Float;
    creator: string;
    BPMDef: C2SBPMDef;
    metDef: C2SMetDef;
    resolution: Integer;
    clkDef: Integer;
    progJudgeBPM: Float;
    progJudgeAER: Float;
    tutorial: boolean;
}

/* Timing Block */

export interface C2SBPMChange {
    bar: Integer;
    offset: Integer;
    bpm: Float;
}

export interface C2STimeSignature {
    bar: Integer;
    offset: Integer;
    numer: Integer;
    denom: Integer;
}

export interface C2SSpeedChange {
    bar: Integer;
    offset: Integer;
    length: Integer;
    speed: Float;
}

/* Notes Block */

export interface C2SBaseNote {
    time: BarOffset384;
    lane: Integer;
    width: Integer;
}

export interface C2STap extends C2SBaseNote {
    type: 'tap';
}

export interface C2SExTap extends C2SBaseNote {
    type: 'extap';
    effect: 'UP' | 'DW' | 'CE';
}

export interface C2SFlick extends C2SBaseNote {
    type: 'flick';
    direction: 'L' | 'R' | 'A';
}

export interface C2SHold extends C2SBaseNote {
    type: 'hold';
    end: BarOffset384;
}

export interface C2SExHold extends C2SBaseNote {
    type: 'exhold';
    end: BarOffset384;
    effect: 'UP' | 'DW' | 'CE';
}

export interface C2SSlide extends C2SBaseNote {
    type: 'slide';
    children: Array<{
        time: BarOffset384;
        lane: Integer;
        width: Integer;
        kind: 'control' | 'segment';
    }>;
}

export interface C2SExSlide extends C2SBaseNote {
    type: 'exslide';
    effect: 'UP' | 'DW' | 'CE';
    children: Array<{
        time: BarOffset384;
        lane: Integer;
        width: Integer;
        kind: 'control' | 'segment';
    }>;
}

export interface C2SAir extends C2SBaseNote {
    type: 'air';
    direction: 'UC' | 'UL' | 'UR' | 'DC' | 'DL' | 'DR';
}

export interface C2SAirHold extends C2SBaseNote {
    type: 'air-hold';
    end: BarOffset384;
}

export interface C2SAirSlide extends C2SBaseNote {
    type: 'air-slide';
    height: Integer;
    children: Array<{
        time: BarOffset384;
        lane: Integer;
        width: Integer;
        height: Integer;
    }>;
}

export interface C2SAirCrush extends C2SBaseNote {
    type: 'air-crush';
    height: Integer;
    end: BarOffset384;
    interval: Integer;
    color: 'DEF';
    child: {
        time: BarOffset384;
        lane: Integer;
        width: Integer;
        height: Integer;
    };
}

export type C2SNote =
    | C2STap
    | C2SExTap
    | C2SFlick
    | C2SHold
    | C2SExHold
    | C2SSlide
    | C2SExSlide
    | C2SAir
    | C2SAirHold
    | C2SAirSlide
    | C2SAirCrush;

/* Metadata Block */

export type C2SMetadata = Record<string, number | string>;

/* Whole File */

export interface C2SChart {
    header: C2SHeader;
    BPMs: C2SBPMChange[];
    timeSignatures: C2STimeSignature[];
    speedChanges?: C2SSpeedChange[];
    notes: C2SNote[];
    metadata?: C2SMetadata;
}
