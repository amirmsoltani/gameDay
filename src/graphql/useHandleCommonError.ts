export function onErrorMessage(err: any, key?: string) {
    if (typeof err === 'string') return err;
    return err?.message || (key && err[key]?.status) || 'ERROR OCCURRED';
}
