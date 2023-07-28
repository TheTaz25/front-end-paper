type Param = Record<string, boolean>;

const cls = (records: Param, otherClasses?: string): string => {
  return Object
    .entries(records)
    .filter(([, yes]) => yes)
    .reduce((previous, [name]) => [...previous, name], otherClasses ? [otherClasses] : [])
    .join(' ')
}

export default cls;