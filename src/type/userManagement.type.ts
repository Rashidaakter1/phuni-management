import { TAcademicDept, TAcademicFaculty } from "./academicManagement.type";

export type TStudent = {
  _id: string;
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: string;
  profileImg?: string;
  isDeleted: boolean;
  academicDepartment: TAcademicDept;
  academicFaculty: TAcademicFaculty;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TAdmin = {
  _id: string;
  id: string;
  designation: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  managementDepartment: string;
  isDeleted: boolean;
};
export type TFaculty = {
  _id: string;
  id: string;
  name: TName;
  designation: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicFaculty: string;
  isDeleted: boolean;
  academicDepartment: TAcademicDept;
};
