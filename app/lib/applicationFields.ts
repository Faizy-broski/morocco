import { z } from "zod";

export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
  "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (DRC)",
  "Congo (Republic)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
  "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay",
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
  "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
  "Other",
] as const;

export const DOCUMENT_TYPES = [
  "Ordinary Passport",
  "Refugee or Stateless Passport",
  "Diplomatic Passport",
  "Service or Mission Passport",
  "Special Passport",
  "United Nations Laissez-Passer",
] as const;

export const PURPOSES_OF_TRIP = ["Tourist", "Business", "Event", "Other"] as const;

export const OCCUPATIONS = [
  "Employee", "Self-employed", "Business owner", "Civil servant", "Student", "Teacher / Academic", "Healthcare professional",
  "Engineer / Technician", "Artist / Media", "Retired", "Homemaker", "Unemployed", "Other",
] as const;

export const ADDITIONAL_VISA_TYPES = [
  "Schengen Visa", "USA Visa", "UK Visa", "Canada Visa", "Japan Visa", "Australia Visa", "New Zealand Visa",
] as const;

export const VISA_ENTRIES = ["Single entry", "Double entry", "Multiple entries"] as const;

export const TRAVEL_CONDITIONS = [
  "Any refused request is non-refundable",
  "I am traveling for tourism purposes",
  "I certify the accuracy of the information provided, in case of error my request will be refused",
  "I have a valid passport when leaving Morocco",
  "I have an additional multiple-entry visa valid for at least 90 days",
  "I have hotel reservation or an invitation",
  "I have a return ticket",
  "I have sufficient financial means (70 EUR per day minimum)",
] as const;
/** Only applies when the purpose of the trip is Tourist. */
export const CONDITION_TOURISM = 1;
/** Only applies when the traveller has another valid visa. */
export const CONDITION_ADDITIONAL_VISA = 4;

export const DIAL_CODES = [
  ["GB", "+44"], ["US", "+1"], ["CA", "+1"], ["IE", "+353"], ["FR", "+33"], ["DE", "+49"], ["ES", "+34"], ["IT", "+39"],
  ["NL", "+31"], ["BE", "+32"], ["CH", "+41"], ["PT", "+351"], ["SE", "+46"], ["NO", "+47"], ["DK", "+45"], ["PL", "+48"],
  ["TR", "+90"], ["AE", "+971"], ["SA", "+966"], ["QA", "+974"], ["KW", "+965"], ["EG", "+20"], ["MA", "+212"], ["DZ", "+213"],
  ["TN", "+216"], ["NG", "+234"], ["GH", "+233"], ["KE", "+254"], ["ZA", "+27"], ["PK", "+92"], ["IN", "+91"], ["BD", "+880"],
  ["LK", "+94"], ["CN", "+86"], ["JP", "+81"], ["KR", "+82"], ["MY", "+60"], ["SG", "+65"], ["PH", "+63"], ["ID", "+62"],
  ["AU", "+61"], ["NZ", "+64"], ["BR", "+55"], ["MX", "+52"], ["AR", "+54"], ["RU", "+7"],
] as const;

const req = (max = 200) => z.string().trim().min(1, "Required").max(max);
const date = (label = "date") => z.coerce.date({ error: `Enter a valid ${label}` });
const optional = <T extends z.ZodType>(schema: T) => z.preprocess((v) => v || undefined, schema.optional());

const shape = {
  // Eligibility
  nationality: z.enum(COUNTRIES, { error: "Please select an option" }),
  countryOfResidence: z.enum(COUNTRIES, { error: "Please select an option" }),
  dateOfBirth: date("date of birth")
    .refine((d) => d < new Date(), "Date of birth must be in the past")
    .refine((d) => d.getFullYear() > 1900, "Enter a valid date of birth"),
  documentType: z.enum(DOCUMENT_TYPES, { error: "Please select an option" }),
  purposeOfTrip: z.enum(PURPOSES_OF_TRIP, { error: "Please select an option" }),
  hasOtherVisa: z.enum(["yes", "no"], { error: "Please select an option" }),
  conditionsAccepted: z.literal("true", { error: "Please accept all travel conditions" }),

  // Personal information
  familyName: req(),
  firstName: req(),
  placeOfBirth: req(),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,25}$/, "Enter a valid phone number"),
  email: z.email().trim().max(200),
  occupation: z.enum(OCCUPATIONS, { error: "Please select an option" }),
  passportNumber: z.string().trim().regex(/^[A-Za-z0-9]{5,20}$/, "Enter a valid passport number"),
  issuedBy: z.enum(COUNTRIES, { error: "Please select an option" }),
  dateOfIssue: date("date of issue").refine((d) => d <= new Date(), "Date of issue cannot be in the future"),
  expiryDate: date("expiry date").refine((d) => d > new Date(), "The passport has expired"),

  // Further information
  additionalVisaType: optional(z.enum(ADDITIONAL_VISA_TYPES)),
  additionalVisaFrom: optional(z.coerce.date()),
  additionalVisaUntil: optional(z.coerce.date()),
  additionalVisaEntries: optional(z.enum(VISA_ENTRIES)),
  additionalVisaNumber: optional(z.string().trim().max(50)),
  arrivalDate: date("arrival date"),
  departureDate: date("departure date"),
  // Optional: UK immigration status (share) code, 9 characters, e.g. W12 3AB 4CD
  ukShareCode: z.preprocess(
    (v) => v ?? "",
    z
      .string()
      .trim()
      .max(20)
      .transform((s) => s.replace(/\s+/g, "").toUpperCase())
      .refine((s) => s === "" || /^[A-Z0-9]{9}$/.test(s), "A UK share code is 9 letters/numbers, e.g. W12 3AB 4CD")
  ),
};

export const travellerSchema = z.object(shape).superRefine((v, ctx) => {
  const add = (path: string, message: string) => ctx.addIssue({ code: "custom", path: [path], message });
  if (v.expiryDate <= v.dateOfIssue) add("expiryDate", "Expiry date must be after the date of issue");
  if (v.departureDate <= v.arrivalDate) add("departureDate", "Departure must be after arrival");
  if (v.arrivalDate < new Date(Date.now() - 24 * 3600 * 1000)) add("arrivalDate", "Arrival date cannot be in the past");
  if (v.hasOtherVisa === "yes") {
    if (!v.additionalVisaType) add("additionalVisaType", "Required");
    if (!v.additionalVisaFrom) add("additionalVisaFrom", "Required");
    if (!v.additionalVisaUntil) add("additionalVisaUntil", "Required");
    else if (v.additionalVisaUntil <= new Date()) add("additionalVisaUntil", "This visa has expired");
    if (v.additionalVisaFrom && v.additionalVisaUntil && v.additionalVisaUntil <= v.additionalVisaFrom)
      add("additionalVisaUntil", "Must be after 'Valid from'");
    if (!v.additionalVisaEntries) add("additionalVisaEntries", "Required");
    if (!v.additionalVisaNumber) add("additionalVisaNumber", "Required");
  }
});

export type TravellerInput = z.infer<typeof travellerSchema>;
export const TRAVELLER_FIELDS = Object.keys(shape);

/** Which wizard step (2-6) each field lives on, so server errors can jump to the right step. */
export const FIELD_STEP: Record<string, number> = {
  nationality: 2, countryOfResidence: 2, dateOfBirth: 2, documentType: 2, purposeOfTrip: 2, hasOtherVisa: 2,
  conditionsAccepted: 3,
  familyName: 4, firstName: 4, placeOfBirth: 4, phone: 4, email: 4, occupation: 4, passportNumber: 4, issuedBy: 4,
  dateOfIssue: 4, expiryDate: 4,
  additionalVisaType: 5, additionalVisaFrom: 5, additionalVisaUntil: 5, additionalVisaEntries: 5, additionalVisaNumber: 5,
  arrivalDate: 5, departureDate: 5, ukShareCode: 5,
  photo: 6, passport: 6, additionalVisa: 6, eVisa: 6,
};
