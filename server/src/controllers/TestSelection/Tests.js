const Patient = require("../../models/Patient");
const categories = require("../misc/categories.json");
const test = require("../misc/test.json");
const testSelection = async (category) => {
  let testToPerform = [];
  if (!category) {
    console.log("No category provided");
    return [];
  }
  switch (category) {
    case "General Fit For Duty":
      testToPerform = [
        test.Audiogram,
        test.CMP,
        test.CBC,
        test.PFT,
        test.RespQ,
        test.RFT,
        test.UA,
      ];
      break;
    case "Welder Medical":
      testToPerform = [
        test.Audiogram,
        test.CMP,
        test.CBC,
        test.XRay,
        test.ECG,
        test.PFT,
        test.RespQ,
        test.RFT,
        test.Titmus,
        test.UA,
        test.Vision,
      ];
      break;
    case "Paint Medical":
      testToPerform = [
        test.Audiogram,
        test.CMP,
        test.CBC,
        test.XRay,
        test.ECG,
        test.PFT,
        test.RespQ,
        test.RFT,
        test.UA,
      ];
      break;
    case "Pest Control Medical":
      testToPerform = [
        test.Irrigation,
        test.Audiogram,
        test.CMP,
        test.CBC,
        test.XRay,
        test.ECG,
        test.PFT,
        test.Titer,
        test.RespQ,
        test.RFT,
        test.STSEv,
        test.Titmus,
        test.Ishihara,
        test.UA,
        test.Vision,
      ];
      break;
    case "Respirator Medical":
      testToPerform = [
        test.Audiogram,
        test.CMP,
        test.CBC,
        test.XRay,
        test.ECG,
        test.PFT,
        test.RespQ,
        test.RFT,
        test.UA,
      ];
      break;
    case "Horticulture":
      testToPerform = [
        test.Audiogram,
        test.CMP,
        test.CBC,
        test.XRay,
        test.ECG,
        test.PFT,
        test.Titmus,
        test.UA,
        test.Vision,
      ];
      break;
    case "Hazmat Medical":
      testToPerform = [test.CMP, test.CBC, test.XRay, test.ECG, test.UA];
      break;
    default:
      testToPerform = [
        test.Irrigation,
        test.Audiogram,
        test.CMP,
        test.CBC,
        test.XRay,
        test.ECG,
        test.PFT,
        test.Titer,
        test.RespQ,
        test.RFT,
        test.STSEv,
        test.Titmus,
        test.Ishihara,
        test.UA,
        test.Vision,
      ];
      break;
  }
  // console.log(testToPerform);
  return testToPerform;
};
module.exports = {
  testSelection,
};
