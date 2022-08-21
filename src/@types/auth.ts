export type User = {
  email?: string;
};

export type AuthInput = {
  email?: string;
  password?: string;
  provider?: SocialProvider;
};

export type SocialProvider = 'google' | 'facebook' | 'github';
