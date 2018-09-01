export const MARBLERADIUS = 12;

export class Coordinates {
  constructor(public x: number, public y: number, public radius: number) {}
}

export class FieldPosition extends Coordinates {
  constructor(public id: number, public x: number, public y: number) {
    super(x, y, 13);
  }
}

export class MarblePosition extends Coordinates {
  constructor(public player: number, public x: number, public y: number) {
    super(x, y, MARBLERADIUS);
  }
}

export class BasePosition extends Coordinates {
  constructor(public player: number, public x: number, public y: number) {
    super(x, y, 40);
  }
}

export class HomePosition extends FieldPosition {
  constructor(public player: number, public id: number, public x: number, public y: number) {
    super(id, x, y);
  }
}

export const TRACK: FieldPosition[] = [
  new FieldPosition(16,  47, 491),
  new FieldPosition(17,  50, 448),
  new FieldPosition(15,  50, 535),
  new FieldPosition(18,  56, 405),
  new FieldPosition(14,  56, 578),
  new FieldPosition(19,  67, 362),
  new FieldPosition(13,  67, 620),
  new FieldPosition(20,  81, 321),
  new FieldPosition(12,  81, 661),
  new FieldPosition(21, 100, 282),
  new FieldPosition(11, 100, 701),
  new FieldPosition(22, 122, 244),
  new FieldPosition(10, 123, 738),
  new FieldPosition(23, 148, 209),
  new FieldPosition( 9, 148, 773),
  new FieldPosition(24, 178, 177),
  new FieldPosition( 8, 177, 805),
  new FieldPosition(25, 210, 148),
  new FieldPosition( 7, 210, 834),
  new FieldPosition(26, 245, 122),
  new FieldPosition( 6, 245, 860),
  new FieldPosition(27, 283,  99),
  new FieldPosition( 5, 282, 883),
  new FieldPosition(28, 322,  81),
  new FieldPosition( 4, 322, 901),
  new FieldPosition(29, 363,  66),
  new FieldPosition( 3, 363, 916),
  new FieldPosition(30, 405,  55),
  new FieldPosition( 2, 405, 927),
  new FieldPosition(31, 448,  49),
  new FieldPosition( 1, 448, 933),
  new FieldPosition(32, 492,  47),
  new FieldPosition( 0, 491, 935),
  new FieldPosition(33, 535,  49),
  new FieldPosition(63, 535, 933),
  new FieldPosition(34, 578,  55),
  new FieldPosition(62, 578, 927),
  new FieldPosition(35, 620,  66),
  new FieldPosition(61, 620, 916),
  new FieldPosition(36, 661,  81),
  new FieldPosition(60, 661, 901),
  new FieldPosition(37, 701,  99),
  new FieldPosition(59, 701, 883),
  new FieldPosition(38, 738, 121),
  new FieldPosition(58, 738, 861),
  new FieldPosition(39, 773, 147),
  new FieldPosition(57, 773, 835),
  new FieldPosition(40, 805, 177),
  new FieldPosition(56, 805, 805),
  new FieldPosition(41, 834, 209),
  new FieldPosition(55, 834, 772),
  new FieldPosition(42, 861, 244),
  new FieldPosition(54, 861, 738),
  new FieldPosition(43, 883, 282),
  new FieldPosition(53, 883, 701),
  new FieldPosition(44, 902, 321),
  new FieldPosition(52, 902, 661),
  new FieldPosition(45, 916, 362),
  new FieldPosition(51, 916, 620),
  new FieldPosition(46, 927, 405),
  new FieldPosition(50, 927, 578),
  new FieldPosition(47, 933, 447),
  new FieldPosition(49, 933, 534),
  new FieldPosition(48, 935, 491)
];

export const HOMES: HomePosition[] = [
  new HomePosition(0, 1, 423, 691),
  new HomePosition(0, 0, 491, 808),
  new HomePosition(0, 2, 490, 652),
  new HomePosition(0, 3, 558, 690),
  new HomePosition(1, 0, 215, 414),
  new HomePosition(1, 1, 282, 452),
  new HomePosition(1, 2, 283, 528),
  new HomePosition(1, 3, 215, 569),
  new HomePosition(2, 3, 423, 290),
  new HomePosition(2, 0, 492, 174),
  new HomePosition(2, 2, 491, 330),
  new HomePosition(2, 1, 559, 289),
  new HomePosition(3, 2, 700, 452),
  new HomePosition(3, 3, 766, 413),
  new HomePosition(3, 0, 766, 569),
  new HomePosition(3, 1, 700, 529)
];

export const BASES: BasePosition[] = [
  new BasePosition(0,  78,  78),
  new BasePosition(1,  78, 905),
  new BasePosition(2, 905, 905),
  new BasePosition(3, 905,  78)
];


