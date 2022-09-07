import { UserRole } from "../entities/user.entity";

const verifyUserType = (data: string): any => {
  if (data === "ADM") {
    return UserRole.ADM;
  }
  if (data === "HR") {
    return UserRole.HR;
  }
  if (data === "manager") {
    return UserRole.MANAGER;
  }
  if (data === "supervisor") {
    return UserRole.SUPERVISOR;
  }
  if (data === "user") {
    return UserRole.USER;
  }
};

export default verifyUserType;
