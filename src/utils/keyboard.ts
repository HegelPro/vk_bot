interface CreateButtonOptions<T> {
  label: string;
  payload: T;
}

export const createButton = <T>({label, payload}: CreateButtonOptions<T>) => {
  return {
    action: {
      type: 'text',
      payload,
      label,
    },
  }
}
