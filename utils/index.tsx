//For validating email inputs

import Education from "../public/educational.svg";
import Feeding from "../public/Feeding.svg";
import Clothing from "../public/Clothing.svg";
import Health from "../public/Health.svg";

export const emailValidationRegexp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//For validating names
export const nameValidationRegexp = /^(?![-\s]+$)[A-Za-z\- ]+$/;

export const states_in_nigeria_dropdown = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Federal Capital Territory (FCT)",
];

export const FeedingFormularData = [" 1 Meal", "2 Meals", "3 Meals"];

export const identityOptions = [
  { value: "NATIONAL_ID", label: "National ID" },
  { value: "DRIVER_LICENCE", label: "Driver's Licence" },
  { value: "VOTERS_CARD", label: "Voter's Card" },
  { value: "INTERNATIONAL_PASSPORT", label: "International Passport" },
];

export const occupationOptions = [
  { value: "EMPLOYED", label: "Employed" },
  { value: "SELF_EMPLOYED", label: "Self Employed" },
  { value: "UNEMPLOYED", label: "Unemployed" },
];

export const maritalStatusOptions = [
  { value: "SINGLE", label: "Single" },
  { value: "MARRIED", label: "Married" },
  { value: "DIVORCED", label: "Divorced" },
  { value: "WIDOWED", label: "Widowed" },
];

export const ActivityData = [
  {
    title: "Education",
    content: "Enroll / populate existing orphan information",
    image: Education,
    link: "/dashboard/guardian/activity/education",
  },
  {
    title: "Feeding",
    content: "Add orphans to feeding  schedules.",
    image: Feeding,
    link: "/dashboard/guardian/activity/feeding",
  },
  {
    title: "Clothing",
    content: "For orphans having clothing needs",
    image: Clothing,
    link: "/dashboard/guardian/activity/clothing",
  },
  {
    title: "Health",
    content: "For orphans having health cares.",
    image: Health,
    link: "/dashboard/guardian/activity/health",
  },
];

export const TopGuardianData = [
  {
    image: "/static/images/avatar/3.jpg",
    imageAlt: "Remy Sharp ",
    name: "Remy Sharp Christopher",
    email: "RemySharp@gmail.com",
    orphan: 20,
  },
  {
    image: "/static/images/avatar/2.jpg",
    imageAlt: "Travis Howard",
    name: "Travis Howard",
    email: "TravisHoward@gmail.com",
    orphan: 15,
  },
  {
    image: "/static/images/avatar/1.jpg",
    imageAlt: "Cindy Baker",
    name: "Cindy Baker",
    email: "CindyBadwfwfwfwwfwker@gmail.com",
    orphan: 10,
  },
];
