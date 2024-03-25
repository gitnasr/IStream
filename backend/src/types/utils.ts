import { Schema } from "mongoose";

export type ObjectId = Schema.Types.ObjectId

export interface RequestIP {
	ip: string;
	hostname: string;
	city: string;
	region: string;
	country: string;
	loc: string;
	org: string;
	timezone: string;
	countryCode: string;
	countryFlag: CountryFlag;
	countryFlagURL: string;
	countryCurrency: CountryCurrency;
	continent: Continent;
	isEU: boolean;
}

interface CountryFlag {
	emoji: string;
	unicode: string;
}

interface CountryCurrency {
	code: string;
	symbol: string;
}
interface Continent {
	code: string;
	name: string;
}
