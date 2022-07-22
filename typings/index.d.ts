type RoleT = "ADMIN" | "OPERATOR" | "CUSTOMER";

type SignAndGetTokenT = Record<"email" | "username" | "role", string>;

type IdAndTimeStampsT = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type MemberT = {
  role: RoleT;
  email: string;
  hashedPassword: string;
  username: string;
  salt: string;
} & IdAndTimeStampsT;

type MemberDocumentT = mongoose.Document & MemberT
