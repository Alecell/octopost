import { StoreAccount } from '~stores/useSocialMediaStore.types';

export type SocialAccordionProps = {
  accounts: StoreAccount[];
  error: boolean;
  socialMediaId: string;
};

export type IAccountList = {
  id: number | string;
  image: string;
  socialMediaName?: string;
  username: string;
};
