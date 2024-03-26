import {Enums, S} from '.';

import { ObjectId } from './utils';

export interface Payload {
    link: string
    user: ObjectId,
    source: Enums.Sources
    quality: Enums.Quality
}
export interface InfoResponse extends S.IScrapy  {
    episodes: string[];
}

export interface StartPayload extends Payload , InfoResponse {}

export type UserPayload = Payload & S.InfoResponse