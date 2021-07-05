const existBodyField = (userId, objectIn) => {
  let objectOut = {};
  objectOut.user = userId;
  objectOut.social = {};
  for (v in objectIn) {
    if (objectIn[v] || objectIn[v].length > 0) {
      if (v === 'skills') {
        objectOut[v] = objectIn[v].split(',').map((skill) => skill.trim());
      } else if (
        v === 'youtube' ||
        v === 'twitter' ||
        v === 'facebook' ||
        v === 'linkedin' ||
        v === 'instagram'
      ) {
        objectOut.social[v] = objectIn[v];
      } else {
        objectOut[v] = objectIn[v];
      }
    }
  }
  return objectOut;
};

module.exports = {
  existBodyField,
};
