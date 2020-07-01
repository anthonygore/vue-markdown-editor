// Modified from https://github.com/ElemeFE/element/blob/dev/packages/upload/src/upload-dragger.vue
export function filesFilter(files, config) {
  const { accept } = config;

  files = Object.keys(files).filter((key) => {
    const file = files[key];
    const { type, name } = file;
    const extension = name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : '';
    const baseType = type.replace(/\/.*$/, '');

    return accept
      .split(',')
      .map((type) => type.trim())
      .filter((type) => type)
      .some((acceptedType) => {
        if (/\..+$/.test(acceptedType)) {
          return extension === acceptedType;
        }

        if (/\/\*$/.test(acceptedType)) {
          return baseType === acceptedType.replace(/\/\*$/, '');
        }

        // eslint-disable-next-line no-useless-escape
        // eslint-disable-next-line no-useless-escape
        if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
          return type === acceptedType;
        }

        return false;
      });
  });

  return files;
}

export function getFilesFromClipboardData(clipboardData) {
  return Object.keys(clipboardData.items)
    .filter((key) => clipboardData.items[key].kind === 'file')
    .map((key) => clipboardData.items[key].getAsFile());
}
