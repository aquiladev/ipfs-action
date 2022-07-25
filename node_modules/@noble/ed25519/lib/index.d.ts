/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
declare const CURVE: {
    a: bigint;
    d: bigint;
    P: bigint;
    l: bigint;
    n: bigint;
    h: bigint;
    Gx: bigint;
    Gy: bigint;
};
export { CURVE };
declare type Hex = Uint8Array | string;
declare type PrivKey = Hex | bigint | number;
declare type PubKey = Hex | Point;
declare type SigType = Hex | Signature;
declare class ExtendedPoint {
    readonly x: bigint;
    readonly y: bigint;
    readonly z: bigint;
    readonly t: bigint;
    constructor(x: bigint, y: bigint, z: bigint, t: bigint);
    static BASE: ExtendedPoint;
    static ZERO: ExtendedPoint;
    static fromAffine(p: Point): ExtendedPoint;
    static toAffineBatch(points: ExtendedPoint[]): Point[];
    static normalizeZ(points: ExtendedPoint[]): ExtendedPoint[];
    equals(other: ExtendedPoint): boolean;
    negate(): ExtendedPoint;
    double(): ExtendedPoint;
    add(other: ExtendedPoint): ExtendedPoint;
    subtract(other: ExtendedPoint): ExtendedPoint;
    private precomputeWindow;
    private wNAF;
    multiply(scalar: number | bigint, affinePoint?: Point): ExtendedPoint;
    multiplyUnsafe(scalar: number | bigint): ExtendedPoint;
    isSmallOrder(): boolean;
    isTorsionFree(): boolean;
    toAffine(invZ?: bigint): Point;
    fromRistrettoBytes(): void;
    toRistrettoBytes(): void;
    fromRistrettoHash(): void;
}
declare class RistrettoPoint {
    private readonly ep;
    static BASE: RistrettoPoint;
    static ZERO: RistrettoPoint;
    constructor(ep: ExtendedPoint);
    private static calcElligatorRistrettoMap;
    static hashToCurve(hex: Hex): RistrettoPoint;
    static fromHex(hex: Hex): RistrettoPoint;
    toRawBytes(): Uint8Array;
    toHex(): string;
    toString(): string;
    equals(other: RistrettoPoint): boolean;
    add(other: RistrettoPoint): RistrettoPoint;
    subtract(other: RistrettoPoint): RistrettoPoint;
    multiply(scalar: number | bigint): RistrettoPoint;
    multiplyUnsafe(scalar: number | bigint): RistrettoPoint;
}
declare class Point {
    readonly x: bigint;
    readonly y: bigint;
    static BASE: Point;
    static ZERO: Point;
    _WINDOW_SIZE?: number;
    constructor(x: bigint, y: bigint);
    _setWindowSize(windowSize: number): void;
    static fromHex(hex: Hex, strict?: boolean): Point;
    static fromPrivateKey(privateKey: PrivKey): Promise<Point>;
    toRawBytes(): Uint8Array;
    toHex(): string;
    toX25519(): Uint8Array;
    isTorsionFree(): boolean;
    equals(other: Point): boolean;
    negate(): Point;
    add(other: Point): Point;
    subtract(other: Point): Point;
    multiply(scalar: number | bigint): Point;
}
declare class Signature {
    readonly r: Point;
    readonly s: bigint;
    constructor(r: Point, s: bigint);
    static fromHex(hex: Hex): Signature;
    assertValidity(): this;
    toRawBytes(): Uint8Array;
    toHex(): string;
}
export { ExtendedPoint, RistrettoPoint, Point, Signature };
declare function bytesToHex(uint8a: Uint8Array): string;
declare function mod(a: bigint, b?: bigint): bigint;
declare function invert(number: bigint, modulo?: bigint): bigint;
declare function getExtendedPublicKey(key: PrivKey): Promise<{
    head: Uint8Array;
    prefix: Uint8Array;
    scalar: bigint;
    point: Point;
    pointBytes: Uint8Array;
}>;
export declare function getPublicKey(privateKey: PrivKey): Promise<Uint8Array>;
export declare function sign(message: Hex, privateKey: Hex): Promise<Uint8Array>;
export declare function verify(sig: SigType, message: Hex, publicKey: PubKey): Promise<boolean>;
export declare function getSharedSecret(privateKey: PrivKey, publicKey: Hex): Promise<Uint8Array>;
export declare const curve25519: {
    BASE_POINT_U: string;
    scalarMult(privateKey: Hex, publicKey: Hex): Uint8Array;
    scalarMultBase(privateKey: Hex): Uint8Array;
};
export declare const utils: {
    TORSION_SUBGROUP: string[];
    bytesToHex: typeof bytesToHex;
    getExtendedPublicKey: typeof getExtendedPublicKey;
    mod: typeof mod;
    invert: typeof invert;
    hashToPrivateScalar: (hash: Hex) => bigint;
    randomBytes: (bytesLength?: number) => Uint8Array;
    randomPrivateKey: () => Uint8Array;
    sha512: (message: Uint8Array) => Promise<Uint8Array>;
    precompute(windowSize?: number, point?: Point): Point;
};
