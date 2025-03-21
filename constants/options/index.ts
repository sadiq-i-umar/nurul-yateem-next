import { getOptions } from "@/utils/form/options";
import { nigeriaStates } from "@/utils/nigeria-states";

const options = {
  gender: getOptions(["Male", "Female"]),
  maritalStatus: getOptions(["Single", "Married", "Widowed", "Divorced"]),
  state: getOptions(nigeriaStates),
  employmentStatus: getOptions(["Self-Employed", "Employed", "Unemployed"]),
  meansOfIdentification: getOptions([
    "National Identification Number",
    "Passport",
    "Driver's License",
  ]),
  schoolStatus: getOptions(["In-School", "Out of School"]),
};

export default options;
