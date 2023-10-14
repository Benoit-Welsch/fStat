export type SizeUnit = {
  _raw: number;
  n: number;
  unit: string;
  toString: () => string;
  round: (r?: number) => number;
  roundToString: (r?: number) => string;
};

export const sizeToUnit = (n: number): SizeUnit => {
  const units = ["P", "T", "G", "M", "K", ""];
  let unitIndex = units.findIndex((_, key) => {
    return n / Math.pow(1000, units.length - key - 1) >= 1;
  });
  if (unitIndex == -1) unitIndex = units.length - 1;
  return {
    _raw : n,
    n: n / Math.pow(1000, units.length - unitIndex - 1),
    unit: units[unitIndex],
    toString: function () {
      return this.n + this.unit;
    },
    round: function (r = 3) {
      // q = number of decimal number
      const q = Math.pow(10, r);
      return Math.round(this.n * q) / q;
    },
    roundToString: function (r = 3) {
      return this.round(r) + this.unit;
    },
  };
};
