export interface AttendanceHistory {
  eventName: string;
  attended: boolean;
}

export interface AttendanceApiResponse {
  fullName: string;
  AHC: AttendanceHistory[];
}
