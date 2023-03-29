export const alterUserData = (data) => {
  console.log(
    data,
    '\n -----------------------------------------------------------',
  );
  delete data.password;
  console.log(data);
  return data;
};
