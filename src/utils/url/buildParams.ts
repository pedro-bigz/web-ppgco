export function buildParams(data: Record<string, any>): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((itemValue) => params.append(key, itemValue.toString()));
    } else {
      params.append(key, value.toString());
    }
  });

  return params;
}
