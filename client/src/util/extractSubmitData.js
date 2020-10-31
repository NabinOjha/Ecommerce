const extractSubmitData = (data) => {
  const valuesOnlyObj = {};
  for (let [key, value] of Object.entries(data)) {
    valuesOnlyObj[key] = value.value;
  }
  return valuesOnlyObj;
};

export default extractSubmitData;
