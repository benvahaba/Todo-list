import { LatLng } from './lat-lng';

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: LatLng;
}
