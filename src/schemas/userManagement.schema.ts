import { z } from "zod";

export const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
    })
    .min(1, "First Name cannot be empty")
    .max(20, "First Name cannot exceed 20 characters")
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string({
    required_error: "Middle Name is required",
  }),
  lastName: z.string({
    required_error: "Last Name is required",
  }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string({
    required_error: "Father's Name is required",
  }),
  fatherOccupation: z.string({
    required_error: "Father's Occupation is required",
  }),
  fatherContactNo: z.string({
    required_error: "Father's Contact Number is required",
  }),
  motherName: z.string({
    required_error: "Mother's Name is required",
  }),
  motherOccupation: z.string({
    required_error: "Mother's Occupation is required",
  }),
  motherContactNo: z.string({
    required_error: "Mother's Contact Number is required",
  }),
});

const localGuardianValidationSchema = z.object({
  name: z.string({
    required_error: "Local Guardian's Name is required",
  }),
  occupation: z.string({
    required_error: "Local Guardian's Occupation is required",
  }),
  contactNo: z.string({
    required_error: "Local Guardian's Contact Number is required",
  }),
  address: z.string({
    required_error: "Local Guardian's Address is required",
  }),
});

export const createStudentValidationSchema = z.object({
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  contactNo: z.string({
    required_error: "Contact Number is required",
  }),
  emergencyContactNo: z.string({
    required_error: "Emergency Contact Number is required",
  }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Blood Group is required",
  }),
  presentAddress: z.string({
    required_error: "Present Address is required",
  }),
  permanentAddress: z.string({
    required_error: "Permanent Address is required",
  }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  admissionSemester: z.string({
    required_error: "Admission Semester is required",
  }),
  profileImg: z.string().optional(),
  academicDepartment: z.string({
    required_error: "Academic Department is required",
  }),
});

export const createFacultyValidationSchema = z.object({
  name: userNameValidationSchema,
  designation: z.string({
    required_error: "Please add a designation",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  email: z
    .string({
      required_error: "Please add an email",
    })
    .email("Invalid email format"),
  contactNo: z.string({
    required_error: "Please add a contact number",
  }),
  emergencyContactNo: z.string({
    required_error: "Please add an emergency contact number",
  }),
  presentAddress: z.string({
    required_error: "Please add a present address",
  }),
  permanentAddress: z.string({
    required_error: "Please add a permanent address",
  }),
  academicFaculty: z.string({
    required_error: "Please select an academic faculty",
  }),
  profileImg: z.string().optional(),
  academicDepartment: z.string({
    required_error: "Please select an academic department",
  }),
});

export const createAdminValidationSchema = z.object({
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  designation: z.string({
    required_error: "Contact Number is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  contactNo: z.string({
    required_error: "Contact Number is required",
  }),
  emergencyContactNo: z.string({
    required_error: "Emergency Contact Number is required",
  }),
  managementDepartment: z.string({
    required_error: "Management Department is required",
  }),
  presentAddress: z.string({
    required_error: "Present Address is required",
  }),
  permanentAddress: z.string({
    required_error: "Permanent Address is required",
  }),
});
