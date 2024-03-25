import { ObjectId } from './utils';
import {S} from '.';

export interface InfoResponse extends Partial<S.IScrapy>  {
    episodes: string[];
}
