export interface ReliefRequest {
  _id: string;
  state: string;
  userId: string;
  district: string;
  email: string;
  shortDesc: string;
  typeOfCalamity: string;
  currentRelief: string;
  requirement: string;
  createdDate: string;
  severity: string;
  phoneNumber: string;
  expectedDelivery: string;
  userIdMapped: string;
  status: string;
  notes: string;
  helpGoodsPhotoHash: string;
  receivedGoodsPhotoHash: string;
}
