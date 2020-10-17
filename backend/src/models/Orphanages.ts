import { Entity } from 'typeorm'

export default class Orphanage {
  id: number;

  name: string;

  latitude: number;

  longitude: number;

  about: string;

  instructions: string;

  opening_hours: string;

  opening_on_weekends: boolean;
}