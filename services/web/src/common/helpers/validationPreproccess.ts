export const preprocessOptionalString = (val?: string) =>
  val === "" ? undefined : val;

export const preprocessOptionalNumber = (val?: string) => {
  if (val === "" || val === undefined) return undefined;
  return Number(val);
};
