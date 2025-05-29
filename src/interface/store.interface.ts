export interface State {
  mode: string | undefined;
  token: string | null;
  role: string | null;
  guid: string | null;
  manager: string | null;
  id_table: string | number | null;
  profile: any;
  permissions: any[];
  placement: any;
  expand: boolean;
  isErr: boolean;
  dataErr: any;
  isOffline: boolean;
  isTimeout: boolean;
  ua: any;
  ip: any;
  device: string;
  splash: boolean;
  isMobile: boolean;
}
