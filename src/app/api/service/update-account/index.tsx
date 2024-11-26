import { baseUrl } from '@/constants';
import { request } from '@/utils/request';

export const AccountSetup = async (Data: any, token: any) => {
  const res = await request('POST', `${baseUrl}/v1/user/account-setup`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    data: Data,
  });

  return res;
};
export const AddOphanApi = async (Data: any, token: any) => {
  const res = await request('POST', `${baseUrl}/guardian/add-orphan`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    data: Data,
  });

  return res;
};

export const EditOrphanApi = async (Data: any, token: any, id: number) => {
  const res = await request('PUT', `${baseUrl}/guardian/edit-orphan/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    data: Data,
  });
  return res;
};

export const AddSponsorshipRequestApi = async (Data: any, token: any) => {
  const res = await request('POST', `${baseUrl}/guardian/sponsorship-request`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    data: Data,
  });
  return res;
};

export const CreateOrphanActivities = async (Data: any, token: any) => {
  const res = await request('POST', `${baseUrl}/guardian/createActivities`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: Data,
  });
  return res;
};
