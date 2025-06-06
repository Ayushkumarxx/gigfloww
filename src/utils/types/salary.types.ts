export type Status = "Paid" | "Pending";

export interface Employee {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  netSalary: number;
  status: Status;
}
