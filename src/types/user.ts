export interface User {
  name: string;
  email: string;
  phone?: string;
  twoFactorEnabled: boolean;
}

export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ConnectedService {
  id: string;
  type: 'WALLET' | 'OAUTH';
  name: string;
  identifier: string;
}