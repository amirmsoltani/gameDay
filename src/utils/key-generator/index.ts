const keyGenerator = (objects: { [key: string]: any }): any[] => {
    const random = (Math.random() * 0xefefef + 0x101010).toString(16);
    return objects.map((ob) => ({ ...ob, key: random }));
};

export default keyGenerator;
